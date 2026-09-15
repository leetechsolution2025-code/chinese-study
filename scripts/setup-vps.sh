#!/bin/bash
# =============================================================
# Chinese Study — VPS Setup Script (Chạy 1 lần đầu trên server)
# Hệ điều hành: Ubuntu 20.04 / 22.04 / 24.04 / Debian
# Cách dùng:
#   1. Upload mã nguồn lên server hoặc chạy script này trên VPS
#   2. chmod +x setup-vps.sh && sudo bash setup-vps.sh
# =============================================================

set -e

# ── Màu sắc terminal ─────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; NC='\033[0m'; BOLD='\033[1m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
info() { echo -e "${BLUE}[→]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }
sep()  { echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }

# ── Nạp cấu hình nếu có ──────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -f "${SCRIPT_DIR}/config.sh" ]; then
    source "${SCRIPT_DIR}/config.sh"
fi

APP_NAME="${APP_NAME:-chinese-study}"
PORT="${PORT:-3350}"
APP_USER="${SSH_USER:-root}"
APP_DIR="${SSH_DIR:-/root/${APP_NAME}}"
DOMAIN="${DOMAIN:-}"
NODE_VERSION="20"

# ─────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║     Chinese Study — VPS Setup Installer v1.0             ║${NC}"
echo -e "${BOLD}╚══════════════════════════════════════════════════════════╝${NC}"
echo -e "  Ứng dụng  : ${APP_NAME}"
echo -e "  Cổng mạng : ${PORT}"
echo -e "  Thư mục   : ${APP_DIR}"
echo ""

# ── Kiểm tra quyền root ──────────────────────────────────────
[[ $EUID -ne 0 ]] && err "Script này phải chạy bằng quyền root. Dùng: sudo bash setup-vps.sh"

sep
info "Bước 1/7: Cập nhật hệ thống & cài công cụ cơ bản..."
apt-get update -qq && apt-get upgrade -y -qq
apt-get install -y -qq git curl wget nano unzip build-essential python3 sqlite3
log "Hệ thống đã cập nhật"

sep
if [ "${APP_USER}" = "root" ]; then
    info "Bước 2/7: Sử dụng user root..."
else
    info "Bước 2/7: Tạo user '${APP_USER}'..."
    if id "${APP_USER}" &>/dev/null; then
        warn "User '${APP_USER}' đã tồn tại"
    else
        adduser --disabled-password --gecos "" "${APP_USER}"
        usermod -aG sudo "${APP_USER}"
        log "Đã tạo user '${APP_USER}'"
    fi
fi

sep
info "Bước 3/7: Cài Node.js LTS (NVM)..."
if [ "${APP_USER}" = "root" ]; then
    curl -s -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    # shellcheck source=/dev/null
    [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
    nvm install ${NODE_VERSION} --silent
    nvm alias default ${NODE_VERSION}
else
    sudo -u "${APP_USER}" bash -c "
        curl -s -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
        export NVM_DIR=\$HOME/.nvm
        [ -s \"\$NVM_DIR/nvm.sh\" ] && source \"\$NVM_DIR/nvm.sh\"
        nvm install ${NODE_VERSION} --silent
        nvm alias default ${NODE_VERSION}
    "
fi
log "Node.js đã cài đặt"

sep
info "Bước 4/7: Cài đặt Web Server Nginx..."
apt-get install -y -qq nginx
systemctl enable nginx
log "Nginx đã cài đặt"

sep
info "Bước 5/7: Cài PM2 quản lý tiến trình..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
npm install -g pm2 --silent
log "PM2 đã cài đặt"

sep
info "Bước 6/7: Thiết lập bộ nhớ RAM ảo (Swap 2GB)..."
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile 2>/dev/null || dd if=/dev/zero of=/swapfile bs=1M count=2048
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    log "Đã tạo Swap 2GB (tránh tràn RAM khi build Next.js)"
else
    log "Swap đã tồn tại"
fi

sep
info "Bước 7/7: Cấu hình tường lửa UFW..."
if command -v ufw &>/dev/null; then
    ufw allow ssh || true
    ufw allow 80 || true
    ufw allow 443 || true
    ufw allow "${PORT}" || true
    ufw --force enable || true
    log "Tường lửa đã kích hoạt"
else
    warn "UFW chưa kích hoạt, bỏ qua"
fi

# ── Tạo file .env nếu thư mục đã tồn tại ──────────────────────
sep
mkdir -p "${APP_DIR}"
if [ ! -f "${APP_DIR}/.env" ]; then
    info "Khởi tạo file .env tại ${APP_DIR}/.env ..."
    cat > "${APP_DIR}/.env" <<EOF
# ElevenLabs API Key (cho TTS phát âm)
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=Xb7hH8MSUJpSbSDYk0k2

# Google Gemini API Keys (cho AI gia sư)
GEMINI_API_KEYS=
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
EOF
    chmod 600 "${APP_DIR}/.env"
    log "Đã tạo file .env mẫu"
fi

# ── Cấu hình Nginx ───────────────────────────────────────────
sep
info "Cấu hình Nginx reverse proxy..."
SERVER_NAME="${DOMAIN:-$(curl -s --max-time 3 ifconfig.me 2>/dev/null || echo '_')}"

cat > "/etc/nginx/sites-available/${APP_NAME}" <<EOF
server {
    listen 80;
    server_name ${SERVER_NAME};

    # Timeout cho AI Streaming / Chat
    proxy_read_timeout 300s;
    proxy_send_timeout 300s;
    proxy_buffering off;
    client_max_body_size 50M;

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
EOF

ln -sf "/etc/nginx/sites-available/${APP_NAME}" "/etc/nginx/sites-enabled/${APP_NAME}"
nginx -t && systemctl reload nginx
log "Nginx đã được thiết lập chuyển hướng sang port ${PORT}"

# ── Thiết lập SSL nếu có domain ──────────────────────────────
if [ -n "${DOMAIN}" ]; then
    sep
    info "Cài đặt SSL miễn phí (Certbot Let's Encrypt) cho ${DOMAIN}..."
    apt-get install -y -qq certbot python3-certbot-nginx
    certbot --nginx -d "${DOMAIN}" --non-interactive --agree-tos -m "admin@${DOMAIN}" --redirect || warn "Certbot chưa cấp được SSL ngay (kiểm tra DNS đã trỏ về IP máy chủ)"
fi

# ── Thiết lập Cron Tự Động Sao Lưu SQLite ────────────────────
sep
info "Cài đặt lịch sao lưu cơ sở dữ liệu SQLite tự động..."
BACKUP_DIR="${APP_DIR}/backup_data"
mkdir -p "${BACKUP_DIR}"

cat > "${APP_DIR}/scripts/cron_backup.sh" <<EOF
#!/bin/bash
BACKUP_DIR="${BACKUP_DIR}"
DB_FILE="${APP_DIR}/chinese_study.db"
DATE=\$(date +%Y%m%d_%H%M%S)

if [ -f "\$DB_FILE" ]; then
    sqlite3 "\$DB_FILE" ".backup '\$BACKUP_DIR/chinese_study_\$DATE.db'"
    find "\$BACKUP_DIR" -name "chinese_study_*.db" -type f -mtime +14 -delete
fi
EOF
chmod +x "${APP_DIR}/scripts/cron_backup.sh" 2>/dev/null || true

# Thêm crontab chạy 3h sáng hàng ngày
(crontab -l 2>/dev/null | grep -v "cron_backup.sh"; echo "0 3 * * * ${APP_DIR}/scripts/cron_backup.sh >> /var/log/chinese_study_backup.log 2>&1") | crontab -
log "Đã thiết lập tự động sao lưu CSDL lúc 03:00 sáng hàng ngày"

# ── Hoàn tất ─────────────────────────────────────────────────
sep
echo ""
echo -e "${GREEN}${BOLD}✅  Cài đặt môi trường VPS hoàn tất!${NC}"
echo ""
echo -e "  ${BOLD}Các bước tiếp theo:${NC}"
echo -e "  1. Tại máy tính cá nhân (Local), chỉ cần chạy lệnh:"
echo -e "     ${YELLOW}bash scripts/update.sh${NC}"
echo -e "     (Hệ thống sẽ tự động build và đồng bộ lên VPS)"
echo ""
echo -e "  2. Hoặc cấu hình IP & Domain trong: ${YELLOW}scripts/config.sh${NC}"
echo ""
