# Chatbot AI Setup Guide

## Tích hợp Google Gemini API (Miễn phí)

### Bước 1: Lấy API Key từ Google AI Studio

1. Truy cập: https://aistudio.google.com/app/apikey
2. Đăng nhập bằng tài khoản Google của bạn
3. Click "Create API Key"
4. Copy API key được tạo

### Bước 2: Tạo file .env.local

Tạo file `.env.local` trong thư mục gốc của project với nội dung:

```
GEMINI_API_KEY=your_api_key_here
```

Thay `your_api_key_here` bằng API key bạn đã copy ở bước 1.

### Bước 3: Restart Development Server

```bash
npm run dev
```

## Giới hạn Free Tier của Google Gemini

- **15 requests/phút**
- **1,500 requests/ngày**
- Hoàn toàn miễn phí cho hầu hết use cases

## Các API AI miễn phí khác (Alternatives)

### 1. Groq API
- **Free tier**: Rất hào phóng
- **Tốc độ**: Cực kỳ nhanh
- **Link**: https://console.groq.com/

### 2. Hugging Face Inference API
- **Free tier**: Có giới hạn
- **Nhiều models**: Llama, Mistral, etc.
- **Link**: https://huggingface.co/inference-api

### 3. OpenAI API
- **Free tier**: $5 credit khi đăng ký
- **Sau đó**: Cần trả phí
- **Link**: https://platform.openai.com/

## Troubleshooting

Nếu chatbot không hoạt động:
1. Kiểm tra file `.env.local` đã được tạo chưa
2. Kiểm tra API key có đúng không
3. Kiểm tra console trong browser để xem lỗi
4. Đảm bảo đã restart server sau khi thêm `.env.local`

## Fallback Mode

Nếu API key không được cấu hình hoặc API bị lỗi, chatbot sẽ tự động chuyển sang chế độ fallback với các câu trả lời đơn giản dựa trên keywords.

## ⚠️ Bảo mật API Key

**QUAN TRỌNG**: 
- ✅ File `.env.local` đã được thêm vào `.gitignore` - sẽ KHÔNG bị commit lên git
- ❌ KHÔNG BAO GIỜ commit API key lên GitHub/GitLab
- ❌ KHÔNG chia sẻ API key công khai
- ✅ API key chỉ được lưu trong `.env.local` (file local, không commit)

Nếu bạn vô tình commit API key:
1. Xóa API key cũ trên Google AI Studio
2. Tạo API key mới
3. Cập nhật trong `.env.local`

