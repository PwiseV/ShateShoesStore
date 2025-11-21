# ShateShoesStore
SE347


*** Step push/pull code
Bước 1: Clone repo về máy
Mỗi thành viên chỉ làm bước này 1 lần để lấy code về local: 
        git clone https://github.com/PwiseV/ShateShoeStore.git
        cd ShateShoeStore
-----
Bước 2: Chuyển sang nhánh develop
Mọi thành viên không làm việc trực tiếp trên main
        git checkout develop
        git pull origin develop
-->Lúc này branch develop trên máy bạn đã đồng bộ với repo GitHub. Tất cả code mới sẽ được push lên develop hoặc branch con feature/*.
-----
Bước 3: Tạo nhánh làm việc riêng cho tính năng của bạn
Mỗi người sẽ tạo branch riêng từ develop theo tính năng mình làm.
        git checkout -b feature/frontend-login

Tên nhánh nên đặt dạng:
        feature/<tên> cho tính năng mới
        fix/<tên> nếu bạn sửa lỗi
        chore/<tên> nếu bạn setup file, cấu hình
-----
Bước 4: Code, lưu thay đổi và commit
Sau khi thêm/chỉnh sửa file:
        git add .
        git commit -m "feat(frontend): add login page layout"
-----
Bước 5: Push code lên GitHub
Push code của bạn lên branch riêng để leader hoặc teammate review.
        git push -u origin feature/frontend-login
-----
Bước 6: Tạo Pull Request (PR)
1.Vào repo GitHub: https://github.com/PwiseV/ShateShoeStore
2.Chọn tab Pull requests → New Pull Request
3.Chọn:
        base: develop
        compare: feature/frontend-login
4.Nhấn Create Pull Request
5.Ghi mô tả (ví dụ: “Thêm giao diện đăng nhập frontend”)
       