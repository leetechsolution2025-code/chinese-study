#!/bin/bash
# =============================================================
# Chinese Study — Sync Database with VPS Server
# Hỗ trợ đồng bộ dữ liệu SQLite (chinese_study.db) giữa Local và VPS
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

LOCAL_DB="chinese_study.db"
REMOTE_DB="chinese_study.db"

# ── Load cấu hình ───────────────────────────────────────────
if [ -f "scripts/config.sh" ]; then
    source scripts/config.sh
else
    err "Không tìm thấy scripts/config.sh!"
fi

SSH_USER="${SSH_USER:-root}"
SSH_DIR="${SSH_DIR:-/root/${APP_NAME}}"
PORT="${PORT:-3350}"

# Kiểm tra SSH Key cá nhân (nếu có dùng flag -i, nếu không dùng mặc định hệ thống)
SSH_OPTS="-o StrictHostKeyChecking=no"
if [ -n "${SSH_KEY}" ] && [ -f "${SSH_KEY}" ]; then
    SSH_OPTS="-i ${SSH_KEY} ${SSH_OPTS}"
fi

if [ -z "${SSH_HOST}" ]; then
    read -p "Vui lòng nhập IP máy chủ VPS: " input_host
    [ -z "${input_host}" ] && err "IP máy chủ không được để trống!"
    SSH_HOST="${input_host}"
fi

echo -e "\n${YELLOW}=================================================================${NC}"
echo -e "${BOLD}   CHINESE STUDY — CÔNG CỤ ĐỒNG BỘ DỮ LIỆU SQLITE (LOCAL ⇄ VPS)   ${NC}"
echo -e "${YELLOW}=================================================================${NC}"
echo "1) [LOCAL → VPS] Chỉ đồng bộ NỘI DUNG HỌC TẬP (Từ vựng, Bài học, Khóa học, Bài đọc)"
echo "   (Giữ nguyên tiến trình học SRS, điểm thi, thống kê người dùng trên VPS)"
echo ""
echo "2) [LOCAL → VPS] ĐẨY TOÀN BỘ DATABASE TỪ LOCAL LÊN VPS"
echo "   (Ghi đè database trên VPS, hệ thống sẽ tự tạo bản backup trên VPS trước)"
echo ""
echo "3) [VPS → LOCAL] KÉO TOÀN BỘ DATABASE TỪ VPS VỀ MÁY LOCAL"
echo "   (Hữu ích để sao lưu dữ liệu thực tế về máy tính cá nhân)"
echo "================================================================="
read -p "Chọn hành động (1, 2, hoặc 3): " sync_choice

# ── 1. Đồng bộ các bảng Master ────────────────────────────────
if [ "$sync_choice" == "1" ]; then
    [ ! -f "$LOCAL_DB" ] && err "Không tìm thấy $LOCAL_DB ở local!"

    MASTER_TABLES=(
        "vocabularies"
        "radicals"
        "reader_articles"
        "courses"
        "lessons"
    )

    info "Đang backup database trên VPS..."
    ssh ${SSH_OPTS} "${SSH_USER}@${SSH_HOST}" "
        mkdir -p ${SSH_DIR}/backup_data
        if [ -f ${SSH_DIR}/${REMOTE_DB} ]; then
            sqlite3 ${SSH_DIR}/${REMOTE_DB} \".backup '${SSH_DIR}/backup_data/backup_pre_sync_\$(date +%s).db'\" 2>/dev/null || cp ${SSH_DIR}/${REMOTE_DB} ${SSH_DIR}/backup_data/backup_pre_sync_\$(date +%s).db
        fi
    "

    info "Đang tải bản nháp DB lên VPS..."
    scp ${SSH_OPTS} "${LOCAL_DB}" "${SSH_USER}@${SSH_HOST}:${SSH_DIR}/temp_local.db"

    info "Đang đồng bộ dữ liệu các bảng nội dung học..."
    SQL_SCRIPT="PRAGMA foreign_keys=OFF; BEGIN TRANSACTION; ATTACH DATABASE 'temp_local.db' AS localDB; "
    for tbl in "${MASTER_TABLES[@]}"; do
        SQL_SCRIPT+="DELETE FROM \"${tbl}\"; INSERT INTO \"${tbl}\" SELECT * FROM localDB.\"${tbl}\"; "
    done
    SQL_SCRIPT+="COMMIT; PRAGMA foreign_keys=ON; DETACH DATABASE localDB;"

    ssh ${SSH_OPTS} "${SSH_USER}@${SSH_HOST}" "
        cd ${SSH_DIR}
        sqlite3 ${REMOTE_DB} \"${SQL_SCRIPT}\"
        rm -f temp_local.db
        pm2 reload ${APP_NAME} 2>/dev/null || true
    "

    log "Đồng bộ NỘI DUNG HỌC TẬP lên VPS thành công!"
    exit 0

# ── 2. Đẩy toàn bộ DB lên VPS ────────────────────────────────
elif [ "$sync_choice" == "2" ]; then
    [ ! -f "$LOCAL_DB" ] && err "Không tìm thấy $LOCAL_DB ở local!"

    warn "CẢNH BÁO: BẠN SẼ GHI ĐÈ DATABASE TRÊN VPS BẰNG BẢN LOCAL!"
    read -p "Bạn có chắc chắn? (y/n): " confirm
    [ "$confirm" != "y" ] && err "Đã hủy thao tác."

    info "Đang backup database hiện tại trên VPS..."
    ssh ${SSH_OPTS} "${SSH_USER}@${SSH_HOST}" "
        mkdir -p ${SSH_DIR}/backup_data
        if [ -f ${SSH_DIR}/${REMOTE_DB} ]; then
            cp ${SSH_DIR}/${REMOTE_DB} ${SSH_DIR}/backup_data/backup_full_\$(date +%s).db
        fi
        pm2 stop ${APP_NAME} 2>/dev/null || true
    "

    info "Đang đẩy file ${LOCAL_DB} lên VPS..."
    scp ${SSH_OPTS} "${LOCAL_DB}" "${SSH_USER}@${SSH_HOST}:${SSH_DIR}/${REMOTE_DB}"

    ssh ${SSH_OPTS} "${SSH_USER}@${SSH_HOST}" "
        cd ${SSH_DIR}
        rm -f ${REMOTE_DB}-wal ${REMOTE_DB}-shm
        pm2 restart ${APP_NAME} 2>/dev/null || true
    "

    log "Ghi đè database lên VPS thành công!"
    exit 0

# ── 3. Kéo DB từ VPS về Local ────────────────────────────────
elif [ "$sync_choice" == "3" ]; then
    mkdir -p backup_data
    if [ -f "$LOCAL_DB" ]; then
        info "Tạo bản lưu trữ local trước khi kéo: backup_data/local_pre_pull_$(date +%s).db"
        cp "$LOCAL_DB" "backup_data/local_pre_pull_$(date +%s).db"
    fi

    info "Đang tải ${REMOTE_DB} từ VPS về máy tính..."
    scp ${SSH_OPTS} "${SSH_USER}@${SSH_HOST}:${SSH_DIR}/${REMOTE_DB}" "${LOCAL_DB}"

    log "Tải database từ VPS về Local thành công!"
    exit 0

else
    err "Lựa chọn không hợp lệ."
fi
