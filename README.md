# Hoa Ngữ (Chinese Study App) — Dự Án Học Tiếng Trung Toàn Diện

Web application hỗ trợ người học tiếng Trung rèn luyện và làm chủ 4 kỹ năng chính: **Nghe (Listening)**, **Nói (Speaking)**, **Đọc (Reading)**, và **Viết (Writing)**, tối ưu hóa theo phương pháp dành riêng cho người Việt (tận dụng âm **Hán - Việt**, **Bộ thủ** và **Chiết tự**).

---

## 🚀 Khởi Động Nhanh (Quick Start)

Dự án đã được thiết lập đầy đủ với **Next.js 15 (App Router)**, **TypeScript** và **Modern Vanilla CSS & Glassmorphism**.

```bash
# 1. Cài đặt thư viện (nếu clone máy mới)
npm install

# 2. Khởi chạy máy chủ phát triển
npm run dev
```

Truy cập ứng dụng tại: [http://localhost:3000](http://localhost:3000)

---

## 🌟 4 Trụ Cột Chức Năng Chính Trên Top Bar

### 1. 🏠 Trang Chủ (`/`)
- **Dashboard định hướng hàng ngày:** Theo dõi chuỗi học tập (Streak), từ vựng đã thuộc, số chữ đã viết, số câu thanh điệu đã luyện.
- **Chữ Hán tiêu biểu hôm nay (Word of the Day):** Phân tích Hán tự, Pinyin, âm Hán - Việt và nghĩa.
- **Lối tắt truy cập nhanh:** Điều hướng tức thì sang Lớp học HSK, Phòng thi thử hoặc Trung tâm luyện tập.

### 2. 🎓 Lớp Học Theo Giáo Trình Chuẩn HSK 1 - HSK 4 (`/courses`)
- **Lộ trình 4 cấp độ:** HSK 1 (Nhập môn), HSK 2 (Sơ cấp), HSK 3 (Sơ - Trung cấp), HSK 4 (Trung cấp).
- **Theo dõi tiến độ động:** Tính phần trăm hoàn thành theo từng khóa học và từng bài học dựa trên dữ liệu SQLite.
- **Không gian lớp học tương tác 4 tab:**
  1. **Bài khóa (课文):** Hội thoại chuẩn, audio từng câu, công tắc Pinyin linh hoạt, bản dịch tiếng Việt.
  2. **Từ vựng mới (生词):** Chữ Hán, Pinyin, âm Hán - Việt, từ loại, ví dụ mẫu, nút chuyển sang luyện viết canvas.
  3. **Điểm ngữ pháp (语法):** Phân tích ngữ pháp chuyên sâu, công thức, lưu ý và ví dụ ngữ cảnh.
  4. **Luyện tập (练习):** Trắc nghiệm kiểm tra tức thì, giải thích chi tiết, chấm điểm tự động và lưu lịch sử vào database.

### 3. 🎯 Trung Tâm Luyện Tập Kỹ Năng (`/practice`)
Trang hub tổng quan gom gọn 5 công cụ rèn luyện chuyên sâu:
- **Tập viết chữ Hán & chiết tự (`/writing`):** Hanzi Writer Canvas mô phỏng thứ tự nét vẽ (笔顺), khung Điền tự cách (田字格), 214 bộ thủ & bẻ khóa chiết tự.
- **Luyện 4 thanh điệu (`/tones`):** Biểu đồ cao độ 5 bậc (55, 35, 214, 51), audio giọng đọc bản xứ, mini-game nghe đoán thanh điệu.
- **Flashcard SRS ngắt quãng (`/flashcards`):** Ôn tập 150 từ vựng HSK 1 với thuật toán FSRS / SM-2, thẻ lật 3D hai mặt.
- **Đọc tương tác Graded Reader (`/reader`):** Truyện đọc phân cấp HSK, công tắc bật/tắt Pinyin, 1-click tra nghĩa tức thì.
- **AI Tutor đàm thoại (`/tutor`):** Roleplay khẩu ngữ theo các tình huống giao tiếp đời sống (Chào hỏi, Gọi món, Mua sắm, Hỏi đường).

### 4. 🏆 Phòng Luyện Thi Thử HSK Chuẩn Hóa (`/exams`)
- **Mô phỏng kỳ thi thật:** Đề thi chuẩn quốc tế cho cả 4 cấp độ HSK 1, HSK 2, HSK 3, HSK 4.
- **2 phần thi cốt lõi:**
  - **Phần Nghe hiểu (听力):** Tích hợp audio phát âm câu hỏi bằng giọng đọc bản xứ chuẩn `zh-CN`.
  - **Phần Đọc hiểu (阅读):** Đọc đoạn văn, chọn đáp án đúng, điền từ vào chỗ trống.
- **Đồng hồ bấm giờ phòng thi:** Đếm ngược thời gian làm bài (35 - 100 phút tùy cấp độ).
- **Chấm điểm tự động & Xếp loại:** Phân tích điểm Nghe, điểm Đọc, đánh giá Đạt/Chưa đạt (chuẩn ≥ 60% tổng điểm) và lưu lịch sử thi vào SQLite.
- **Mục lục câu hỏi thông minh:** Thanh điều hướng trạng thái câu đã làm / chưa làm.

8. **Cơ Sở Dữ Liệu SQLite Cục Bộ (`chinese_study.db`)**:
   - Tích hợp `better-sqlite3` với chế độ Write-Ahead Logging (WAL) tốc độ cao.
   - Quản lý tập trung 7 bảng: Khóa học (`courses`), Bài học (`lessons`), Tiến trình học bài (`user_lesson_progress`), Từ vựng HSK, Bộ thủ & Chiết tự, Tiến trình SRS, Chuỗi ngày học (Streak).
   - Tự động tạo bảng và nạp dữ liệu ban đầu (Auto-Seed) từ `courses.json`, `hsk1_vocab.json`, v.v. ngay khi khởi chạy.
   - Các API endpoints: `/api/courses`, `/api/courses/[courseId]`, `/api/lessons/[lessonId]`, `/api/lessons/[lessonId]/complete`, `/api/vocab`, `/api/srs`, `/api/stats`, `/api/ai/chat`.

---

## 📁 Cấu Trúc Mã Nguồn

```text
Chinese-study/
├── doc/
│   └── he_thong_hoc_tieng_trung.md   # Tài liệu phân tích yêu cầu kỹ thuật
├── public/                           # Tài nguyên tĩnh
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Khung ứng dụng chung & Navigation bar
│   │   ├── globals.css               # Hệ thống CSS Design System (Glassmorphism, Tokens)
│   │   ├── page.tsx                  # Trang chủ (Dashboard)
│   │   ├── courses/                  # Trung tâm khóa học HSK 1 - HSK 4
│   │   │   ├── page.tsx              # Danh sách khóa học HSK 1 - 4
│   │   │   ├── [courseId]/page.tsx   # Lộ trình các bài học của khóa
│   │   │   └── [courseId]/[lessonId]/page.tsx # Lớp học tương tác 4 tab
│   │   ├── writing/page.tsx          # Mô-đun tập viết chữ Hán & Chiết tự
│   │   ├── tones/page.tsx            # Mô-đun luyện 4 thanh điệu
│   │   ├── flashcards/page.tsx       # Mô-đun Flashcard SRS (HSK 1)
│   │   ├── reader/page.tsx           # Mô-đun Graded Reader tương tác
│   │   ├── tutor/page.tsx            # Mô-đun đàm thoại AI Tutor
│   │   └── api/
│   │       ├── courses/route.ts      # API danh sách khóa học
│   │       ├── courses/[courseId]/route.ts # API bài học theo khóa
│   │       ├── lessons/[lessonId]/route.ts # API nội dung chi tiết bài học
│   │       ├── lessons/[lessonId]/complete/route.ts # API lưu kết quả bài học vào SQLite
│   │       ├── vocab/route.ts        # API từ vựng SQLite
│   │       ├── srs/route.ts          # API tiến độ SRS
│   │       ├── stats/route.ts        # API thống kê học tập
│   │       └── ai/chat/route.ts      # API route xử lý đối thoại AI
│   ├── components/
│   │   ├── common/AudioButton.tsx    # Nút phát âm Web Speech API zh-CN
│   │   ├── layout/Navbar.tsx         # Thanh điều hướng trên cùng kèm Streak badge & Lớp học
│   │   ├── writing/HanziCanvas.tsx   # Canvas tích hợp hanzi-writer (Stroke order, Quiz)
│   │   ├── tones/TonePitchChart.tsx  # Biểu đồ cao độ SVG thanh điệu
│   │   └── flashcards/SRSReviewSession.tsx # Bộ điều khiển ôn tập thẻ SRS
│   ├── data/
│   │   ├── courses.json              # Dữ liệu giáo trình chuẩn HSK 1 - HSK 4
│   │   ├── hsk1_vocab.json           # Dữ liệu từ vựng HSK 1 kèm âm Hán Việt
│   │   ├── radicals.json             # Dữ liệu bộ thủ & câu chuyện chiết tự
│   │   ├── tones.json                # Dữ liệu cao độ và mẫu phát âm 4 thanh điệu
│   │   └── articles.json             # Bài đọc tương tác phân cấp
│   ├── hooks/
│   │   └── useSpeech.ts              # Custom hook Text-To-Speech tiếng Trung
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts              # Khởi tạo SQLite connection, DDL & auto-seeding
│   │   │   ├── courses.ts            # Repository truy vấn khóa học & tiến độ bài học
│   │   │   └── schema.sql            # Định nghĩa bảng SQL
│   │   ├── srs.ts                    # Thuật toán Spaced Repetition SM-2
│   │   └── storage.ts                # Quản lý lưu trữ cục bộ LocalStorage
│   └── types/
│       └── index.ts                  # Type definitions TypeScript
├── package.json
└── tsconfig.json
```
