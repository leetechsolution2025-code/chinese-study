# Hệ Thống Hỗ Trợ Học Tiếng Trung Toàn Diện (Chinese Study Web App)

## 1. Tổng Quan Dự Án
Web application hỗ trợ người học tiếng Trung rèn luyện và làm chủ 4 kỹ năng chính: **Nghe (Listening)**, **Nói (Speaking)**, **Đọc (Reading)**, và **Viết (Writing)**, kết hợp tối ưu hóa phương pháp học dành riêng cho người Việt (tận dụng âm **Hán - Việt** và **Bộ thủ/Chiết tự**).

---

## 2. Phân Rã Tính Năng Theo Kỹ Năng

### 2.1. Kỹ Năng Viết & Nhận Diện Hán Tự (Writing / Characters)
* **Tập viết chữ Hán động (Stroke Order Animation):**
  - Tích hợp animation mô phỏng thứ tự từng nét vẽ theo quy chuẩn (笔顺).
  - Canvas tương tác cho phép người dùng dùng chuột, bút cảm ứng hoặc ngón tay để đồ theo nét.
  - Chấm điểm độ chuẩn xác của nét vẽ, cảnh báo khi viết sai thứ tự hoặc sai chiều nét.
* **Chiết tự & Bộ thủ (Radicals & Character Decomposition):**
  - Bẻ nhỏ từng chữ Hán phức tạp thành các bộ thủ cấu thành.
  - Kèm câu chuyện liên tưởng và ghi nhớ hình tượng (ví dụ: 休 = 人 [người] + 木 [cây] -> người tựa cây nghỉ ngơi).
* **Vũ khí ghi nhớ cho người Việt - Âm Hán - Việt:**
  - Luôn hiển thị song song: **Chữ Hán | Pinyin | Âm Hán - Việt | Nghĩa tiếng Việt**.
  - Quy tắc chuyển đổi phụ âm/nguyên âm giữa Hán Việt và Pinyin để người học suy luận từ vựng cao cấp (HSK 4 - 6).

### 2.2. Kỹ Năng Nói & Phát Âm (Speaking / Tones)
* **Luyện 4 Thanh điệu & Biểu đồ cao độ (Tone Contour):**
  - Mô phỏng đường biểu diễn cao độ thanh điệu (Thanh 1: 55, Thanh 2: 35, Thanh 3: 214, Thanh 4: 51, Thanh nhẹ).
  - Ghi âm giọng nói người dùng và vẽ biểu đồ so sánh trực quan với giọng đọc chuẩn của người bản xứ.
* **AI Conversation Partner (Khẩu ngữ thực chiến):**
  - Đóng vai tương tác (Roleplay) theo các tình huống giao tiếp đời sống: mua sắm, gọi món, hỏi đường, phỏng vấn xin việc, đàm phán thương mại.
  - Phản hồi bằng giọng nói tự nhiên thời gian thực và tự động nhận xét phát âm, lỗi ngữ pháp, gợi ý câu trả lời tự nhiên hơn.
* **Shadowing & Đánh giá phát âm (Pronunciation Assessment):**
  - Đọc nhại theo từng câu mẫu có sẵn.
  - Chấm điểm chính xác theo từng âm vị (Phoneme level) và thanh điệu.

### 2.3. Kỹ Năng Nghe (Listening)
* **Nghe chép chính tả (Dictation Practice):**
  - Nghe audio câu ngắn hoặc đoạn hội thoại, sau đó gõ lại Pinyin hoặc chọn đúng Hán tự tương ứng.
* **Tùy biến tốc độ & Phân đoạn âm thanh:**
  - Tùy chỉnh tốc độ phát: 0.75x, 1x, 1.25x.
  - Chế độ lặp đoạn A-B giúp luyện nghe sâu các câu phức tạp.
  - Ẩn/hiện transcript linh hoạt (nghe trước, xem script sau).

### 2.4. Kỹ Năng Đọc (Reading)
* **Interactive Graded Reader (Trình đọc tương tác theo cấp độ):**
  - Thư viện truyện ngắn, tin tức, bài viết được phân loại chuẩn theo khung **HSK 1 đến HSK 9**.
  - **Pinyin Switcher:** Nút bật/tắt hiển thị Pinyin toàn bài hoặc chế độ "Hover-to-reveal" (chỉ hiện khi rê chuột vào).
  - **Click-to-Define:** Bấm vào bất kỳ từ nào để hiển thị popup giải nghĩa nhanh (Pinyin, Âm Hán Việt, Nghĩa, Ví dụ, Nút lưu vào sổ từ).
  - **Tách từ thông minh (Word Segmentation):** Tự động gom cụm từ ghép tiếng Trung để tránh tra nhầm các ký tự đơn lẻ.

### 2.5. Hệ Thống Ghi Nhớ & Động Lực Học Tập
* **Spaced Repetition System (SRS - Thuật toán FSRS / SM-2):**
  - Tự động lên lịch ôn tập từ vựng, ngữ pháp đúng thời điểm người học chuẩn bị quên.
* **Gamification:** Streak hàng ngày, huy hiệu thành tích, bảng xếp hạng nhiệm vụ tuần.

---

## 3. Kiến Trúc & Giải Pháp Công Nghệ

### 3.1. Frontend Architecture
* **Framework:** Next.js (App Router, React) hoặc Vite + React.
* **Styling:** Modern CSS / TailwindCSS kết hợp Dark/Light theme, phong cách Glassmorphism, kiểu chữ tối ưu cho tiếng Trung (*Noto Sans SC*, *PingFang SC*).
* **Thư viện chuyên dụng tiếng Trung:**
  - `hanzi-writer`: Hiển thị animation vẽ nét chữ Hán, canvas tương tác kiểm tra nét viết.
  - `pinyin-pro`: Chuyển đổi Hán tự sang Pinyin nhanh, hỗ trợ đầy đủ thanh điệu dấu hoặc số.
  - `Intl.Segmenter` / `jieba-wasm`: Tách từ vựng tiếng Trung chuẩn ngữ pháp ngay trên trình duyệt.

### 3.2. Backend & Dịch Vụ AI / Audio
* **Backend:** Node.js (NestJS) hoặc Python (FastAPI).
  - *FastAPI* khuyến nghị nếu xử lý các tác vụ NLP chuyên sâu, phân loại cấp độ từ vựng, hoặc pipeline xử lý audio.
* **Database:** PostgreSQL (hỗ trợ quan hệ từ điển, bộ thủ, Hán Việt và `pgvector` cho semantic search).
* **Text-to-Speech (TTS):**
  - Microsoft Edge-TTS / Azure Speech TTS (giọng chuẩn zh-CN Xiaoxiao, Yunxi cực tự nhiên).
  - Web Speech API cho môi trường dev/local không tốn chi phí.
* **Speech-to-Text & Chấm điểm phát âm:**
  - Azure Speech Pronunciation Assessment API (chấm điểm Pinyin, thanh điệu chi tiết).
  - Whisper API cho việc nhận diện giọng nói tự do.
* **AI Tutor (LLM):**
  - Google Gemini 2.0 / 1.5 Flash: Tốc độ cao, chi phí rẻ, khả năng đối thoại song ngữ Trung - Việt xuất sắc.

---

## 4. Lộ Trình Triển Khai (Roadmap)

### Giai đoạn 1: MVP Cốt Lõi (Hanzi & Flashcard Engine)
1. Xây dựng giao diện từ điển tra cứu Hán tự (Pinyin, Âm Hán Việt, Bộ thủ, Nghĩa).
2. Tích hợp `hanzi-writer` để tập viết chữ Hán trên Canvas.
3. Flashcard SRS học 150 từ HSK 1 cơ bản kèm audio phát âm.

### Giai đoạn 2: Trình Đọc Tương Tác & Luyện Nghe
1. Xây dựng Interactive Reader với tính năng bật/tắt Pinyin và click tra từ.
2. Bài tập nghe chép chính tả (Dictation) theo câu ngắn.

### Giai đoạn 3: AI Speaking Partner & Mở Rộng HSK
1. Tích hợp AI Chatbot luyện khẩu ngữ theo tình huống thực tế.
2. Chấm điểm phát âm thanh điệu.
3. Mở rộng kho dữ liệu HSK 1 đến HSK 6.
