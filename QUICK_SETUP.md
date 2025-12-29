# 🚀 Quick Setup Guide - Step by Step

## Bước 1: Setup Gmail App Password (Bắt buộc)

### 1.1. Bật 2-Step Verification
1. Mở: https://myaccount.google.com/security
2. Tìm phần "2-Step Verification"
3. Click "Get started" và làm theo hướng dẫn
4. Xác thực bằng số điện thoại

### 1.2. Tạo App Password
1. Mở: https://myaccount.google.com/apppasswords
   - Nếu không thấy link, vào: https://myaccount.google.com/security
   - Tìm "App passwords" (có thể cần scroll xuống)
2. Chọn:
   - **App**: Mail
   - **Device**: Other (Custom name)
   - Nhập tên: `CV Website`
3. Click "Generate"
4. **Copy password 16 ký tự** (ví dụ: `abcd efgh ijkl mnop`)
   - ⚠️ **Lưu ý**: Chỉ hiển thị 1 lần, copy ngay!

### 1.3. Thêm vào .env.local
Mở file `.env.local` và thêm các dòng sau:

```env
# Email Configuration (Bắt buộc)
EMAIL_USER=code.with.dobby@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Lưu ý**: 
- Thay `abcd efgh ijkl mnop` bằng App Password bạn vừa copy
- Nếu App Password có khoảng trắng, có thể bỏ khoảng trắng hoặc giữ nguyên

## Bước 2: (Tùy chọn) Setup Firebase

Nếu bạn muốn lưu appointments và contacts vào database:

### 2.1. Tạo Firebase Project
1. Vào: https://console.firebase.google.com/
2. Click "Add project" hoặc chọn project có sẵn
3. Làm theo hướng dẫn tạo project

### 2.2. Enable Firestore
1. Trong Firebase Console, vào **Firestore Database**
2. Click "Create database"
3. Chọn "Start in test mode" (hoặc production mode nếu bạn biết cách setup rules)
4. Chọn location (gần nhất với bạn)
5. Click "Enable"

### 2.3. Tạo Service Account
1. Vào **Project Settings** (icon bánh răng) > **Service Accounts**
2. Click "Generate new private key"
3. Click "Generate key" trong popup
4. File JSON sẽ được download

### 2.4. Thêm vào .env.local
1. Mở file JSON vừa download
2. Copy **TOÀN BỘ** nội dung
3. Thêm vào `.env.local`:

```env
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'
```

**Lưu ý**: 
- Phải có dấu nháy đơn `'` bên ngoài
- Copy toàn bộ JSON, không thiếu dấu nào

## Bước 3: Restart Server

Sau khi thêm tất cả biến môi trường:

1. **Dừng server** (nếu đang chạy): Nhấn `Ctrl+C` trong terminal
2. **Chạy lại**:
   ```bash
   npm run dev
   ```

## Bước 4: Test

### Test Appointment Booking:
1. Mở website: http://localhost:3000
2. Click nút calendar ở góc dưới bên phải
3. Điền form và submit
4. Kiểm tra email `code.with.dobby@gmail.com` có nhận được thông báo không

### Test Contact Form:
1. Scroll xuống cuối trang
2. Tìm form "Get in Touch"
3. Điền form và submit
4. Kiểm tra email có nhận được không

## ✅ Checklist

- [ ] Đã bật 2-Step Verification cho Gmail
- [ ] Đã tạo App Password
- [ ] Đã thêm `EMAIL_USER` vào `.env.local`
- [ ] Đã thêm `EMAIL_PASSWORD` vào `.env.local`
- [ ] Đã thêm `NEXT_PUBLIC_BASE_URL` vào `.env.local`
- [ ] (Tùy chọn) Đã setup Firebase và thêm `FIREBASE_SERVICE_ACCOUNT`
- [ ] Đã restart server
- [ ] Đã test appointment booking
- [ ] Đã test contact form

## 🐛 Troubleshooting

### Email không gửi được?
- Kiểm tra App Password có đúng không (16 ký tự)
- Kiểm tra `EMAIL_USER` có đúng email không
- Xem terminal logs để biết lỗi cụ thể
- Đảm bảo đã bật 2-Step Verification

### Firebase không hoạt động?
- Kiểm tra `FIREBASE_SERVICE_ACCOUNT` có đúng format JSON không
- Đảm bảo Firestore đã được enable
- Không bắt buộc - nếu không setup, email vẫn hoạt động

### Server không chạy?
- Đảm bảo đã chạy `npm run dev`
- Kiểm tra port 3000 có bị chiếm không
- Xem terminal để biết lỗi cụ thể

## 📝 File .env.local mẫu (hoàn chỉnh)

```env
# Gemini API (cho chatbot)
GEMINI_API_KEY=AIzaSyCF2ZR6oxmcKsRFYbS4p1XVy-0hyFseHnM

# Email Configuration (Bắt buộc)
EMAIL_USER=code.with.dobby@gmail.com
EMAIL_PASSWORD=your-16-char-app-password-here
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Firebase (Tùy chọn)
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"your-project","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",...}'
```



