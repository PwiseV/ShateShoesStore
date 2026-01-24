# Cart Debug Guide

## Các lỗi thường gặp và cách fix:

### 1. Lỗi 401 Unauthorized
**Nguyên nhân:** User chưa đăng nhập
**Cách fix:** 
- Đăng nhập trước khi vào trang cart
- Kiểm tra token trong localStorage/cookies
- Kiểm tra middleware `protectedRoute` trong backend

### 2. Lỗi 404 Not Found
**Nguyên nhân:** API endpoint không đúng
**Cách fix:**
- Kiểm tra `VITE_API_URL` trong file `.env`
- Đảm bảo backend đang chạy
- Kiểm tra routes trong `backend/src/routes/cart.route.js`

### 3. Lỗi CORS
**Nguyên nhân:** Frontend và Backend khác origin
**Cách fix:**
- Kiểm tra CORS config trong `backend/src/server.js`
- Đảm bảo frontend URL có trong whitelist

### 4. Data không hiển thị
**Nguyên nhân:** Response format không khớp
**Cách fix:**
- Mở DevTools > Network tab
- Kiểm tra response từ API `/users/cart`
- So sánh với type `CartItem` trong `frontend/src/pages/Customer/Cart/types.ts`

## Các bước debug:

1. **Kiểm tra Backend:**
```bash
cd backend
npm run dev
```

2. **Kiểm tra Frontend:**
```bash
cd frontend
npm run dev
```

3. **Test API trực tiếp:**
- Mở Postman/Thunder Client
- GET `http://localhost:5001/api/users/cart`
- Header: `Authorization: Bearer YOUR_TOKEN`

4. **Kiểm tra Console:**
- Mở DevTools > Console
- Xem có error message nào không
- Kiểm tra Network tab để xem API calls

## API Endpoints:

- GET `/api/users/cart` - Lấy giỏ hàng
- POST `/api/users/cart` - Thêm vào giỏ hàng
- PATCH `/api/users/cart/:id` - Cập nhật số lượng/variant
- DELETE `/api/users/cart/:id` - Xóa sản phẩm

## Response Format mong đợi:

```json
{
  "success": true,
  "message": "Fetch cart successfully",
  "data": [
    {
      "cartItemId": "...",
      "variantId": "...",
      "quantity": 1,
      "size": "38",
      "color": "Đen",
      "price": 500000,
      "stock": 10,
      "avatar": "...",
      "isOutOfStock": false,
      "isAdjust": false,
      "product": {
        "productId": "...",
        "title": "Giày...",
        "sizes": [...]
      }
    }
  ]
}
```

## Đã fix:

✅ Backend service: Đổi `isAdjusted` thành `isAdjust` để khớp với frontend
✅ Frontend types: Đã định nghĩa đầy đủ CartItem interface
✅ Cart hooks: Đã xử lý loading, error, và optimistic updates
✅ Components: Đã có đầy đủ CartList, CartItem, CartSummary

## Nếu vẫn lỗi:

Vui lòng cung cấp:
1. Error message trong Console
2. Network response từ API
3. Screenshot của lỗi
