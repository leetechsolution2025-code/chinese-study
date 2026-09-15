#!/bin/bash
# =============================================================
# Chinese Study — Auto Backup SQLite Database
# Tự động sao lưu file chinese_study.db và dọn dẹp file cũ
# Cách dùng: bash scripts/auto_backup.sh
# =============================================================

set -e

GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
log()  { echo -e "${GREEN}[✓]${NC} $1"; }
info() { echo -e "${BLUE}[→]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "${APP_DIR}"

BACKUP_DIR="backup_data"
mkdir -p "$BACKUP_DIR"

DB_FILE="chinese_study.db"

if [ ! -f "$DB_FILE" ]; then
    warn "Chưa tìm thấy file CSDL $DB_FILE tại ${APP_DIR} (CSDL sẽ tự động sinh khi người dùng truy cập lần đầu)."
    exit 0
fi

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_PATH="$BACKUP_DIR/backup_${TIMESTAMP}.db"

info "Đang tiến hành sao lưu $DB_FILE -> $BACKUP_PATH..."

# Sử dụng SQLite online backup API nếu có command sqlite3, an toàn khi DB đang có người dùng ghi dữ liệu
if command -v sqlite3 &>/dev/null; then
    sqlite3 "$DB_FILE" ".backup '$BACKUP_PATH'"
else
    cp "$DB_FILE" "$BACKUP_PATH"
fi

log "Sao lưu thành công: $BACKUP_PATH ($(du -sh "$BACKUP_PATH" | cut -f1))"

# Dọn dẹp các file sao lưu cũ hơn 14 ngày
find "$BACKUP_DIR" -name "backup_*.db" -type f -mtime +14 -delete
log "Đã dọn dẹp các bản sao lưu cũ hơn 14 ngày."
