#!/bin/bash
# =============================================================
# Chinese Study — Update to VPS Server Script (Local-Build & Push)
# Build mã nguồn tại máy cá nhân, sau đó ném thành phẩm lên VPS
# =============================================================

set -e

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; NC='\033[0m'; BOLD='\033[1m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
info() { echo -e "${BLUE}[→]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "${APP_DIR}"

# ── Load cấu hình ───────────────────────────────────────────
if [ -f "scripts/config.sh" ]; then
    source scripts/config.sh
else
    err "Không tìm thấy scripts/config.sh!"
fi

# ── Kiểm tra cấu hình SSH ────────────────────────────────────
if [ -z "${SSH_HOST}" ]; then
    echo -e "${YELLOW}[!] Chưa cấu hình IP máy chủ (SSH_HOST) trong scripts/config.sh${NC}"
    read -p "Vui lòng nhập IP máy chủ VPS: " input_host
    if [ -z "${input_host}" ]; then
        err "IP máy chủ không được để trống!"
    fi
    SSH_HOST="${input_host}"
fi

SSH_USER="${SSH_USER:-root}"
SSH_DIR="${SSH_DIR:-/root/${APP_NAME}}"
PORT="${PORT:-3388}"

# Kiểm tra SSH Key cá nhân (nếu có dùng flag -i, nếu không dùng mặc định hệ thống)
SSH_OPTS="-o StrictHostKeyChecking=no"
if [ -n "${SSH_KEY}" ] && [ -f "${SSH_KEY}" ]; then
    SSH_OPTS="-i ${SSH_KEY} ${SSH_OPTS}"
fi

info "Bắt đầu cập nhật ứng dụng [${APP_NAME}] lên máy chủ ${SSH_USER}@${SSH_HOST}..."
info "Thư mục cài đặt trên máy chủ: ${SSH_DIR} (Port: ${PORT})"

# ── Bước 1: Build tại Local ────────────────────────────────
info "Bắt đầu biên dịch (Build Next.js) tại máy tính cá nhân..."
BUILD_START=$(date +%s)
mkdir -p public
echo "{\"version\": \"${BUILD_START}\", \"build_date\": \"$(date '+%Y-%m-%d %H:%M:%S')\"}" > public/version.json
npm run build
BUILD_END=$(date +%s)
log "Build xong trong $((BUILD_END - BUILD_START)) giây."

# ── Bước 2: Đồng bộ mã nguồn lên VPS bằng rsync ─────────────────────
# Đẩy thành phẩm (.next) và source code lên máy chủ.
# Tuyệt đối giữ nguyên Database (SQLite), env và node_modules trên VPS.
info "Đang đẩy thành phẩm (.next) và source code lên máy chủ (đồng bộ rsync)..."
rsync -avz --delete \
    --exclude="node_modules" \
    --exclude=".git" \
    --exclude="storage" \
    --exclude=".next/cache" \
    --exclude=".next/dev" \
    --exclude="*.log" \
    --exclude="artifacts" \
    --exclude="scratch" \
    --exclude=".env" \
    --exclude=".env.local" \
    --exclude=".env.*.local" \
    --exclude="scripts/config.sh" \
    --exclude="*.db" \
    --exclude="*.db-*" \
    --exclude="*.sqlite" \
    --exclude="backup_data" \
    -e "ssh ${SSH_OPTS}" . "${SSH_USER}@${SSH_HOST}:${SSH_DIR}/"

log "Mã nguồn và thư mục build (.next) đã đồng bộ thành công lên máy chủ!"

# ── Bước 3: Cài đặt và Restart trên VPS qua SSH ─────────────────────
info "Đang cấu hình và Khởi động lại trên máy chủ..."
ssh ${SSH_OPTS} -t "${SSH_USER}@${SSH_HOST}" "
  export NVM_DIR=\"\$HOME/.nvm\"
  [ -s \"\$NVM_DIR/nvm.sh\" ] && source \"\$NVM_DIR/nvm.sh\"
  cd ${SSH_DIR}

  echo -e \"\033[0;34m[→]\033[0m Cài đặt/cập nhật thư viện npm...\"
  npm install --prefer-offline

  echo -e \"\033[0;34m[→]\033[0m Biên dịch lại better-sqlite3 cho môi trường Linux VPS...\"
  npm rebuild better-sqlite3 2>/dev/null || true

  # Cập nhật ecosystem.config.js trên VPS
  cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: '${APP_NAME}',
      script: 'npm',
      args: 'start -- -p ${PORT}',
      cwd: '${SSH_DIR}',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '600M',
      env: {
        NODE_ENV: 'production',
        PORT: ${PORT}
      }
    }
  ]
};
EOF

  echo -e \"\033[0;34m[→]\033[0m Khởi động lại ứng dụng PM2 trên port ${PORT}...\"
  pm2 delete \"${APP_NAME}\" 2>/dev/null || true
  pm2 start ecosystem.config.js
  pm2 save

  # Cập nhật Nginx proxy sang PORT mới
  if command -v nginx &>/dev/null && [ -n \"${DOMAIN}\" ]; then
      echo -e \"\033[0;34m[→]\033[0m Cập nhật Nginx reverse proxy sang port ${PORT}...\"
      sed -i \"s/127.0.0.1:[0-9]*/127.0.0.1:${PORT}/g\" \"/etc/nginx/sites-available/${APP_NAME}\" 2>/dev/null || true
      nginx -t && systemctl reload nginx || true
  fi

  echo -e \"\033[0;34m[→]\033[0m Kiểm tra phản hồi dịch vụ...\"
  sleep 3
  if curl -sf \"http://127.0.0.1:${PORT}\" > /dev/null 2>&1; then
      echo -e \"\033[0;32m[✓]\033[0m Ứng dụng đang phản hồi tốt tại port ${PORT}!\"
  else
      echo -e \"\033[1;33m[!]\033[0m Cảnh báo: Chưa nhận phản hồi từ port ${PORT}, kiểm tra: pm2 logs ${APP_NAME}\"
  fi
"

echo ""
echo -e "${GREEN}${BOLD}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}${BOLD}║  ✅  Cập nhật ứng dụng lên VPS thành công!                ║${NC}"
echo -e "${GREEN}${BOLD}╚══════════════════════════════════════════════════════════╝${NC}"
echo -e "  🌐 Địa chỉ: http://${SSH_HOST}:${PORT}"
[ -n "${DOMAIN}" ] && echo -e "  🔗 Tên miền: https://${DOMAIN}"
echo ""
