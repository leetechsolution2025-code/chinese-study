#!/bin/bash
# =============================================================
# Cấu hình Deploy cho dự án: Học Tiếng Trung (chinese-study)
# =============================================================

APP_NAME="chinese-study"
PORT=3350
DOMAIN="chinese.leetech.vn"

# Nginx config path
NGINX_CONF="/etc/nginx/sites-available/${APP_NAME}"

# Log file
LOG_FILE="/var/log/deploy_${APP_NAME}.log"

# Cấu hình SSH để deploy từ máy cá nhân lên server (cho lệnh update.sh / sync-db.sh)
SSH_HOST="14.225.198.32"
SSH_USER="root"
SSH_DIR="/root/${APP_NAME}"
SSH_KEY="${HOME}/.ssh/id_ed25519"
