# Backend hệ thống quản lý xưởng giày

## Công nghệ
- Node.js + Express: tạo Backend/API.
- `data/state.json`: lưu dữ liệu trên máy chạy server.
- Giao diện HTML/CSS/JavaScript gốc được giữ lại trong `public/index.html`.

## Chạy trên Windows
1. Cài Node.js bản LTS từ https://nodejs.org/ (nếu máy chưa có).
2. Giải nén thư mục dự án.
3. Mở thư mục `xuong-giay-backend` bằng VS Code.
4. Chọn Terminal > New Terminal.
5. Chạy:
   ```bash
   npm install
   npm start
   ```
6. Mở trình duyệt tại http://localhost:3000

## API có sẵn
- `GET /api/health`: kiểm tra Backend.
- `GET /api/state`: lấy dữ liệu hệ thống.
- `PUT /api/state`: lưu toàn bộ dữ liệu hệ thống.

## Các dữ liệu được lưu
Nguyên vật liệu, sản phẩm, đối tác, BOM, lệnh sản xuất, lịch sử kho, đơn hàng bán, thu chi, vai trò và tài khoản hiển thị.

## Lưu ý quan trọng
- Dữ liệu được lưu trong `data/state.json` trên máy chạy server, không chỉ trong trình duyệt.
- Nếu chưa chạy server, giao diện vẫn có thể dùng localStorage như trước.
- Đây là bản Backend nền tảng cho đồ án/demo: toàn bộ trạng thái ứng dụng được lưu theo một tệp JSON. Chưa có đăng nhập bảo mật thực sự, phân quyền phía server, hay cơ sở dữ liệu SQL. Không dùng dữ liệu/mật khẩu thật khi chưa bổ sung bảo mật.
- Nếu nhiều người dùng thao tác đồng thời, cần nâng cấp sang SQL Server/MySQL và API theo từng chức năng.
