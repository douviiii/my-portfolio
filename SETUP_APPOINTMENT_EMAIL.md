# Setup Guide: Appointment Booking & Email Contact

## 📋 Tổng quan

Website đã được tích hợp:
- ✅ **Full-width layout** (không còn giới hạn A4)
- ✅ **Appointment Booking** - Đặt lịch hẹn với bạn
- ✅ **Contact Form** - Form liên hệ gửi email
- ✅ **Firebase Integration** (tùy chọn) - Lưu trữ dữ liệu

## 🔧 Setup Email (Bắt buộc)

### Cách 1: Sử dụng Gmail với App Password (Khuyến nghị)

1. **Bật 2-Step Verification** cho Gmail của bạn:
   - Vào: https://myaccount.google.com/security
   - Bật "2-Step Verification"

2. **Tạo App Password**:
   - Vào: https://myaccount.google.com/apppasswords
   - Chọn "Mail" và "Other (Custom name)"
   - Nhập tên: "CV Website"
   - Copy password được tạo (16 ký tự)

3. **Thêm vào `.env.local`**:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

### Cách 2: Sử dụng Email Service khác

Bạn có thể sử dụng các email service khác như:
- SendGrid
- Mailgun
- AWS SES
- Resend

Chỉ cần cập nhật `app/api/send-email/route.ts` với cấu hình tương ứng.

## 🔥 Setup Firebase (Tùy chọn)

Firebase được dùng để lưu trữ appointments và contact messages.

### Bước 1: Tạo Firebase Project

1. Vào: https://console.firebase.google.com/
2. Tạo project mới hoặc chọn project có sẵn
3. Enable **Firestore Database**

### Bước 2: Tạo Service Account

1. Vào **Project Settings** > **Service Accounts**
2. Click **Generate New Private Key**
3. Download file JSON

### Bước 3: Thêm vào `.env.local`

```env
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'
```

**Lưu ý**: Copy toàn bộ nội dung file JSON và paste vào `.env.local` (giữ nguyên dấu ngoặc kép).

### Bước 4: Tạo Collections trong Firestore

Firestore sẽ tự động tạo collections khi có dữ liệu:
- `appointments` - Lưu appointments
- `contacts` - Lưu contact messages

## 🚀 Chạy ứng dụng

1. **Thêm biến môi trường vào `.env.local`**:
   ```env
   # Email (Bắt buộc)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   
   # Firebase (Tùy chọn)
   FIREBASE_SERVICE_ACCOUNT='{"type":"service_account",...}'
   
   # Gemini API (Nếu dùng chatbot)
   GEMINI_API_KEY=your-api-key
   ```

2. **Restart development server**:
   ```bash
   npm run dev
   ```

## 📧 Cách hoạt động

### Appointment Booking
- User điền form đặt lịch
- Dữ liệu được lưu vào Firestore (nếu có)
- Email thông báo được gửi đến `code.with.dobby@gmail.com`
- User nhận confirmation message

### Contact Form
- User điền form liên hệ
- Dữ liệu được lưu vào Firestore (nếu có)
- Email được gửi đến `code.with.dobby@gmail.com`
- User nhận confirmation message

## ⚠️ Lưu ý

1. **Email là bắt buộc** - Nếu không setup email, appointments và contacts sẽ không được gửi
2. **Firebase là tùy chọn** - Nếu không setup Firebase, dữ liệu chỉ được gửi qua email
3. **App Password** - Phải dùng App Password, không dùng password thường của Gmail
4. **Production** - Khi deploy, nhớ thêm các biến môi trường vào hosting platform (Vercel, Netlify, etc.)

## 🐛 Troubleshooting

### Email không gửi được
- Kiểm tra App Password có đúng không
- Kiểm tra `EMAIL_USER` và `EMAIL_PASSWORD` trong `.env.local`
- Xem logs trong terminal để biết lỗi cụ thể

### Firebase không hoạt động
- Kiểm tra `FIREBASE_SERVICE_ACCOUNT` có đúng format JSON không
- Đảm bảo Firestore đã được enable
- Kiểm tra permissions của service account

### API routes không hoạt động
- Đảm bảo đã restart server sau khi thêm `.env.local`
- Kiểm tra console logs để xem lỗi cụ thể

## 📝 Cấu trúc Files

```
app/
├── api/
│   ├── appointment/route.ts    # API cho appointment booking
│   ├── contact/route.ts         # API cho contact form
│   └── send-email/route.ts     # API gửi email
├── components/
│   ├── AppointmentBooking.tsx  # Component booking
│   └── ContactForm.tsx         # Component contact form
└── page.tsx                    # Main page (đã thêm components)
```

## ✅ Checklist

- [ ] Setup Gmail App Password
- [ ] Thêm `EMAIL_USER` và `EMAIL_PASSWORD` vào `.env.local`
- [ ] (Tùy chọn) Setup Firebase và thêm `FIREBASE_SERVICE_ACCOUNT`
- [ ] Restart development server
- [ ] Test appointment booking
- [ ] Test contact form
- [ ] Kiểm tra email có nhận được không



