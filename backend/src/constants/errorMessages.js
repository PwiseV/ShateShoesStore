// Error messages in Vietnamese
export const ERROR_MESSAGES = {
  // Common
  SERVER_ERROR: "Lỗi hệ thống",
  INVALID_INPUT: "Dữ liệu đầu vào không hợp lệ",
  UNAUTHORIZED: "Bạn không có quyền thực hiện thao tác này",
  MISSING_REQUIRED_FIELDS: "Thiếu thông tin bắt buộc",

  // User
  USER_ID_REQUIRED: "Thiếu ID người dùng",
  USER_NOT_FOUND: "Người dùng không tồn tại",
  USER_ALREADY_EXISTS: "Người dùng đã tồn tại",

  // Auth
  INVALID_CREDENTIALS: "Tên đăng nhập hoặc mật khẩu không đúng",
  EMAIL_ALREADY_EXISTS: "Email đã được sử dụng",
  USERNAME_ALREADY_EXISTS: "Tên đăng nhập đã tồn tại",
  INVALID_TOKEN: "Token không hợp lệ",
  TOKEN_EXPIRED: "Token đã hết hạn",
  REFRESH_TOKEN_INVALID: "Refresh token không hợp lệ",
  REFRESH_TOKEN_EXPIRED: "Refresh token đã hết hạn",
  EMAIL_NOT_FOUND: "Email không tồn tại",
  ADMIN_CANNOT_RESET: "Tài khoản admin không thể sử dụng chức năng này",
  GOOGLE_ACCOUNT_CANNOT_RESET: "Tài khoản Google không thể đặt lại mật khẩu",
  GOOGLE_ACCOUNT_CANNOT_CHANGE: "Tài khoản Google không thể đổi mật khẩu",
  RESET_TOKEN_INVALID: "Token không hợp lệ hoặc đã hết hạn",
  OLD_PASSWORD_INCORRECT: "Mật khẩu hiện tại không đúng",

  // Product
  PRODUCT_NOT_FOUND: "Sản phẩm không tồn tại",
  PRODUCT_CODE_EXISTS: "Mã sản phẩm đã tồn tại",
  SLUG_EXISTS: "Đường dẫn (slug) đã tồn tại",
  CATEGORY_NOT_FOUND: "Danh mục không tồn tại",
  IMAGE_REQUIRED_FOR_NEW_COLOR: "Cần ảnh cho màu mới",
  VARIANT_ALREADY_EXISTS: "Biến thể sản phẩm đã tồn tại",
  VARIANT_NOT_FOUND: "Biến thể sản phẩm không tồn tại",
  MISSING_UPDATE_FIELDS: "Thiếu thông tin cần cập nhật",

  // Promotion
  PROMOTION_NOT_FOUND: "Khuyến mãi không tồn tại",
  PROMOTION_CODE_EXISTS: "Mã khuyến mãi đã tồn tại",
  PROMOTION_CODE_ALREADY_EXISTS: "Mã khuyến mãi đã tồn tại",
  PROMOTION_CODE_REQUIRED: "Vui lòng nhập mã khuyến mãi",
  PROMOTION_EXPIRED: "Khuyến mãi đã hết hạn",
  PROMOTION_NOT_STARTED: "Khuyến mãi chưa bắt đầu",
  PROMOTION_NOT_VALID: "Khuyến mãi không hợp lệ",
  PROMOTION_LIMIT_REACHED: "Khuyến mãi đã hết lượt sử dụng",
  PROMOTION_ALREADY_USED_BY_USER: "Bạn đã sử dụng khuyến mãi này rồi",
  MIN_ORDER_VALUE_NOT_MET: "Giá trị đơn hàng chưa đủ điều kiện áp dụng",
  EXPIRED_DATE_INVALID: "Ngày kết thúc phải ở tương lai",
  STARTED_DATE_INVALID: "Ngày bắt đầu phải ở tương lai",
  INVALID_DATE_RANGE: "Ngày bắt đầu phải trước ngày kết thúc",
  CANNOT_SET_ACTIVE_BEFORE_START_DATE: "Không thể kích hoạt trước ngày bắt đầu",
  CANNOT_SET_ACTIVE_AFTER_EXPIRED_DATE: "Không thể kích hoạt sau ngày hết hạn",
  CANNOT_SET_UPCOMING_AFTER_START_DATE: "Đã qua ngày bắt đầu, không thể đặt là sắp diễn ra",
  CANNOT_SET_EXPIRED_BEFORE_END_DATE: "Khuyến mãi chưa kết thúc, không thể đặt là hết hạn",
  INVALID_STATUS_VALUE: "Trạng thái không hợp lệ",

  // Review
  ORDER_ITEM_NOT_FOUND: "Không tìm thấy sản phẩm trong đơn hàng",
  REVIEW_ALREADY_EXISTS: "Bạn đã đánh giá sản phẩm này rồi",
  INVALID_RATING: "Đánh giá phải từ 1 đến 5 sao",

  // Post
  POST_NOT_FOUND: "Bài viết không tồn tại",
  SLUG_ALREADY_EXISTS: "Đường dẫn (slug) đã tồn tại",
  THUMBNAIL_REQUIRED: "Ảnh đại diện là bắt buộc",

  // Order
  ORDER_NOT_FOUND: "Đơn hàng không tồn tại",
  ORDER_ITEM_NOT_FOUND: "Sản phẩm trong đơn hàng không tồn tại",

  // Cart
  CART_ITEM_NOT_FOUND: "Sản phẩm không có trong giỏ hàng",
  INSUFFICIENT_STOCK: "Không đủ hàng trong kho",

  // Address
  ADDRESS_NOT_FOUND: "Địa chỉ không tồn tại",
  DEFAULT_ADDRESS_REQUIRED: "Phải có ít nhất một địa chỉ mặc định",

  // Favourite
  FAVOURITE_NOT_FOUND: "Sản phẩm yêu thích không tồn tại",
  FAVOURITE_ALREADY_EXISTS: "Sản phẩm đã có trong danh sách yêu thích",
};

// Helper function to get error message
export const getErrorMessage = (errorCode) => {
  return ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.SERVER_ERROR;
};
