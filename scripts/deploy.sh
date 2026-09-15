#!/bin/bash
# =============================================================
# Chinese Study — VPS Deploy Script
# Chạy trực tiếp trên VPS để build và deploy dự án Học Tiếng Trung
# Cách dùng:
#   bash scripts/deploy.sh
# =============================================================

set -e

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; NC='\033[0m'; BOLD='\033[1m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
info() { echo -e "${BLUE}[→]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# ── Load cấu hình deploy tập trung ──────────────────────
# shellcheck source=scripts/config.sh
source "${APP_DIR}/scripts/config.sh"

PORT="${PORT:-3350}"

# ── Load NVM (cần thiết khi chạy non-interactive shell) ──────
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck source=/dev/null
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

# Nếu npm vẫn không tìm thấy, thử tìm trong các vị trí phổ biến
if ! command -v npm &>/dev/null; then
    for CANDIDATE in /usr/local/bin/npm /usr/bin/npm "$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -1)/bin/npm"; do
        [ -x "$CANDIDATE" ] && export PATH="$(dirname $CANDIDATE):$PATH" && break
    done
fi

command -v npm &>/dev/null || { echo -e "\033[0;31m[✗]\033[0m npm không tìm thấy! Hãy cài Node.js trước."; exit 1; }

# ── Tự động cài PM2 nếu chưa có ─────────────────────────────
if ! command -v pm2 &>/dev/null; then
    warn "PM2 chưa được cài. Đang cài tự động..."
    npm install -g pm2
    export PATH="$(npm root -g)/../.bin:$PATH"
fi

command -v pm2 &>/dev/null || err "Không thể cài PM2. Hãy chạy: npm install -g pm2"
log "PM2 sẵn sàng ($(pm2 -v))"

echo ""
echo -e "${BOLD}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║     Chinese Study — Deploy Script v1.0                   ║${NC}"
echo -e "${BOLD}╚══════════════════════════════════════════════════════════╝${NC}"
echo -e "  Thư mục   : ${APP_DIR}"
echo -e "  Ứng dụng  : ${APP_NAME}"
echo -e "  Cổng mạng : ${PORT}"
echo -e "  Thời gian : $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

cd "${APP_DIR}"

# ── Kiểm tra file .env ───────────────────────────────────────
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        warn "Không tìm thấy .env. Đang sao chép từ .env.example..."
        cp .env.example .env
        warn "Vui lòng cập nhật API Keys trong file .env nếu cần AI/TTS!"
    else
        touch .env
    fi
fi
log "File .env sẵn sàng"

# ── Pull code mới nhất từ Git (nếu có) ────────────────────────
if [ "${SKIP_GIT}" = "1" ]; then
    info "Đã thiết lập SKIP_GIT=1. Bỏ qua kéo code từ Git."
elif [ -d ".git" ]; then
    info "Phát hiện Git repository. Kéo code mới từ Git..."
    git checkout -- package-lock.json 2>/dev/null || true
    git stash -u 2>/dev/null || true
    git pull --rebase || warn "Không thể pull code từ Git, tiếp tục sử dụng mã nguồn hiện tại."
    git stash pop 2>/dev/null || true
    log "Code đã cập nhật ($(git log -1 --format='%h %s' 2>/dev/null || echo 'HEAD'))"
else
    info "Không phát hiện Git repository. Sử dụng mã nguồn hiện có."
fi

# ── Cài dependencies & rebuild better-sqlite3 ───────────────
info "Cài npm dependencies..."
npm install --prefer-offline
log "Dependencies đã cài đặt"

info "Biên dịch lại better-sqlite3 cho môi trường Linux VPS..."
npm rebuild better-sqlite3 2>/dev/null || true
log "SQLite driver sẵn sàng"

# ── Dừng app cũ trước khi build ──────────────────────────────
info "Dừng app cũ trước khi build..."
if pm2 list 2>/dev/null | grep -q "${APP_NAME}"; then
    pm2 stop "${APP_NAME}" 2>/dev/null || true
    log "App cũ đã tạm dừng"
fi
fuser -k "${PORT}/tcp" 2>/dev/null || true
sleep 1

# Xóa build locks nếu có
rm -f .next/lock || true

# ── Build Production ─────────────────────────────────────────
info "Build production Next.js..."
BUILD_START=$(date +%s)
npm run build
BUILD_END=$(date +%s)
log "Build xong trong $((BUILD_END - BUILD_START)) giây"

# ── Khởi động / Restart PM2 ──────────────────────────────────
info "Khởi động app với PM2..."

cat > "${APP_DIR}/ecosystem.config.js" <<EOF
module.exports = {
  apps: [
    {
      name: '${APP_NAME}',
      script: 'npm',
      args: 'start -- -p ${PORT}',
      cwd: '${APP_DIR}',
      instances: 1,
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

if pm2 list 2>/dev/null | grep -q "${APP_NAME}"; then
    pm2 delete "${APP_NAME}" 2>/dev/null || true
fi
pm2 start "${APP_DIR}/ecosystem.config.js"
pm2 startup 2>/dev/null | grep "sudo" | bash || true
pm2 save
log "App đã khởi động với PM2"

# ── Cấu hình Nginx ───────────────────────────────────────────
if command -v nginx &>/dev/null; then
    SERVER_NAME="${DOMAIN:-$(curl -s --max-time 3 ifconfig.me 2>/dev/null || echo '_')}"
    mkdir -p "$(dirname ${NGINX_CONF})"

    if [ -n "${DOMAIN}" ]; then
        info "Cấu hình Nginx cho tên miền: ${DOMAIN}..."
        cat > "${NGINX_CONF}" <<NGINX
server {
    listen 80;
    server_name ${DOMAIN};
    client_max_body_size 50M;

    # Hỗ trợ AI streaming / SSE
    proxy_read_timeout 300s;
    proxy_send_timeout 300s;
    proxy_buffering off;

    location / {
        proxy_pass         http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host \$host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
    }
}
NGINX
        ln -sf "${NGINX_CONF}" "/etc/nginx/sites-enabled/${APP_NAME}" 2>/dev/null || true
        nginx -t && systemctl reload nginx || true

        # Cài certbot nếu chưa có
        if ! command -v certbot &>/dev/null; then
            info "Cài certbot..."
            apt-get install -y -qq certbot python3-certbot-nginx 2>/dev/null || warn "Không cài được certbot"
        fi

        if command -v certbot &>/dev/null; then
            info "Lấy SSL certificate cho ${DOMAIN}..."
            certbot --nginx -d "${DOMAIN}" \
                --non-interactive --agree-tos \
                --email "admin@${DOMAIN}" \
                --redirect 2>/dev/null \
                && log "HTTPS đã kích hoạt → https://${DOMAIN}" \
                || warn "certbot chưa cấp được chứng chỉ (kiểm tra DNS trỏ IP)"
        fi
    else
        info "Cấu hình Nginx HTTP (IP: ${SERVER_NAME})..."
        cat > "${NGINX_CONF}" <<NGINX
server {
    listen 80;
    server_name ${SERVER_NAME};
    client_max_body_size 50M;

    proxy_read_timeout 300s;
    proxy_send_timeout 300s;
    proxy_buffering off;

    location / {
        proxy_pass         http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host \$host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
    }
}
NGINX
        ln -sf "${NGINX_CONF}" "/etc/nginx/sites-enabled/${APP_NAME}" 2>/dev/null || true
        nginx -t && systemctl reload nginx \
            && log "Nginx HTTP → http://${SERVER_NAME}" \
            || warn "Nginx cấu hình chưa hợp lệ"
    fi
else
    warn "Nginx chưa được cài đặt — bỏ qua cấu hình Nginx"
fi

# ── Kiểm tra sức khoẻ ────────────────────────────────────────
info "Kiểm tra tình trạng hoạt động..."
sleep 4
if curl -sf "http://localhost:${PORT}" > /dev/null 2>&1; then
    log "App đang phản hồi tốt tại http://localhost:${PORT} ✅"
else
    warn "App chưa phản hồi ngay — kiểm tra log: pm2 logs ${APP_NAME}"
fi

echo ""
echo -e "${GREEN}${BOLD}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}${BOLD}║  ✅  Deploy thành công!                                    ║${NC}"
echo -e "${GREEN}${BOLD}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  pm2 status                # Xem trạng thái ứng dụng"
echo -e "  pm2 logs ${APP_NAME}     # Xem log thời gian thực"
echo -e "  pm2 restart ${APP_NAME}  # Khởi động lại ứng dụng"
echo ""
