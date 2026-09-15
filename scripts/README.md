# Bộ Tập Lệnh Tự Động Triển Khai & Cập Nhật VPS (chinese-study)

Bộ script này được thiết kế để hỗ trợ bạn triển khai, cập nhật và quản lý ứng dụng **Học Tiếng Trung (chinese-study)** trên máy chủ VPS Ubuntu / Debian một cách an toàn và tự động.

---

## 📁 Danh sách tập lệnh

| Tệp tin | Vị trí chạy | Mô tả |
| :--- | :---: | :--- |
| **`config.sh`** | Cả hai | Cấu hình chung: IP máy chủ, Port, Tên miền, Thư mục cài đặt. |
| **`update.sh`** | **Local (Mac)** | **Lệnh thường dùng nhất**: Tự động build Next.js tại máy Mac rồi đẩy thành phẩm lên VPS và reload PM2. |
| **`setup-vps.sh`** | **VPS (Root)** | Chạy 1 lần đầu trên VPS để cài đặt Node.js, PM2, Nginx, UFW, Swap RAM, Certbot SSL và lịch sao lưu tự động. |
| **`deploy.sh`** | **VPS** | Build và kích hoạt ứng dụng trực tiếp từ mã nguồn trên máy chủ. |
| **`sync-db.sh`** | **Local (Mac)** | Đồng bộ CSDL SQLite (`chinese_study.db`) giữa Local và VPS (hỗ trợ chỉ đồng bộ từ vựng/bài học hoặc kéo DB từ VPS về). |
| **`auto_backup.sh`** | **VPS / Local** | Tự động sao lưu file `chinese_study.db` vào thư mục `backup_data/` và xoá bản sao lưu cũ quá 14 ngày. |
| **`start.sh`** | **VPS** | Khởi động hoặc nạp lại ứng dụng qua PM2. |
| **`stop.sh`** | **VPS** | Dừng ứng dụng và giải phóng cổng mạng. |

---

## 🚀 Quy trình sử dụng

### 1. Cấu hình ban đầu (`scripts/config.sh`)
Mở file [scripts/config.sh](file:///Users/leanhvan/chinese-study/scripts/config.sh) để kiểm tra các thông số:
- `SSH_HOST`: Địa chỉ IP của máy chủ VPS (mặc định: `14.225.198.32`).
- `PORT`: Cổng mạng ứng dụng chạy trên VPS (mặc định: `3350`).
- `DOMAIN`: Tên miền của bạn (ví dụ: `chinese.leetech.vn` hoặc để trống nếu dùng IP).
- `SSH_USER`: Mặc định là `root`.

### 2. Cài đặt môi trường VPS lần đầu (Chỉ chạy 1 lần)
Nếu là VPS mới, chạy lệnh sau trên VPS:
```bash
sudo bash scripts/setup-vps.sh
```

### 3. Cập nhật mã nguồn từ máy tính lên VPS (Quy trình hàng ngày)
Mỗi khi bạn sửa code xong và muốn đẩy lên VPS, chỉ cần mở terminal tại thư mục dự án trên máy Mac và gõ:
```bash
bash scripts/update.sh
```
> **Cơ chế hoạt động của `update.sh`**:
> 1. Next.js được build ngay tại máy Mac của bạn (rất nhanh và không ngốn CPU/RAM của VPS).
> 2. Dùng `rsync` chuyển mã nguồn cùng thư mục `.next` đã build lên VPS qua SSH.
> 3. Tuyệt đối **không ghi đè file database SQLite** (`chinese_study.db`) và các file cấu hình bí mật (`.env`).
> 4. Tự động biên dịch lại driver `better-sqlite3` tương thích Linux và khởi động lại PM2 mà không gián đoạn dịch vụ.

---

## 🔄 Quản trị Cơ sở dữ liệu SQLite (`sync-db.sh`)
Khi bạn thêm từ vựng, bài học mới ở máy cá nhân và muốn đẩy lên VPS:
```bash
bash scripts/sync-db.sh
```
Hệ thống cung cấp 3 tùy chọn:
1. **Chỉ đồng bộ nội dung học**: Cập nhật từ vựng, bài khóa, chiết tự, khóa học từ local lên VPS; **giữ nguyên toàn bộ lịch sử học, thẻ ghi nhớ SRS, điểm thi của học viên trên VPS**.
2. **Ghi đè toàn bộ DB**: Thay thế hoàn toàn DB trên VPS bằng bản local (tự động tạo file backup an toàn trước khi ghi đè).
3. **Kéo DB từ VPS về**: Tải dữ liệu thực tế trên VPS về máy Mac để kiểm tra hoặc lưu trữ offline.
