describe("Tính năng Đăng nhập (Login)", () => {
  // Trước mỗi test case, truy cập vào trang login
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Nên hiển thị lỗi khi bỏ trống các trường", () => {
    cy.get('button[type="submit"]').click();

    // Kiểm tra thông báo Toast hoặc validate hiện lên
    // (Dựa trên code LoginForm của bạn dùng showToast)
    cy.contains("Please fill in all fields").should("be.visible");
  });

  it("Nên hiển thị lỗi khi nhập sai tài khoản hoặc mật khẩu", () => {
    // Nhập email đúng định dạng nhưng không tồn tại hoặc sai pass
    cy.get('input[type="email"]').clear().type("wrong-user@gmail.com");
    cy.get('input[type="password"]').clear().type("12345678");

    cy.get('button[type="submit"]').click();

    // Đợi và kiểm tra nội dung chính xác hiện lên
    // Lưu ý: 'be.visible' đảm bảo popup không bị ẩn hoặc nằm dưới element khác
    cy.contains("tên đăng nhập", {
      matchCase: false,
      timeout: 5000,
    }).should("be.visible");

    // Nếu thông báo của bạn là "Signin failed" hoặc tiếng Anh (tùy code BE của bạn)
    // cy.contains('Signin failed').should('be.visible');
  });

  it("Nên đăng nhập thành công với tài khoản hợp lệ", () => {
    // Nhập tài khoản test (Bạn nên dùng tài khoản thật trên DB Vercel của bạn)
    cy.get('input[type="email"]').type("longnguyenha555@gmail.com");
    cy.get('input[type="password"]').type("Nguyen@123");

    // Click nút đăng nhập
    cy.get('button[type="submit"]').click();

    // Kiểm tra xem có hiển thị Toast thành công không
    cy.contains("đã đăng nhập").should("be.visible");

    // Sau khi login xong, kiểm tra xem có điều hướng về homepage không
    cy.url().should("include", "/homepage");

    // Kiểm tra xem localStorage có lưu userId không (như code LoginForm của bạn)
    cy.window().then((win) => {
      expect(win.localStorage.getItem("userId")).to.exist;
    });
  });

  it("Nên điều hướng sang trang Đăng ký khi nhấn link Sign up", () => {
    cy.contains("Sign up").click();
    cy.url().should("include", "/register");
  });
});
describe("Tính năng Đăng ký tài khoản (Sign up)", () => {
  const existingEmail = "longnguyenha555@gmail.com";

  beforeEach(() => {
    // Thay đổi đường dẫn này cho đúng với route đăng ký trên web của bạn
    cy.visit("/register");
  });

  it("1. Đăng ký thành công (Happy Path)", () => {
    // Tạo email ngẫu nhiên để không bị trùng khi chạy test nhiều lần
    const randomEmail = `testuser_${Date.now()}@gmail.com`;

    // Mock API đăng ký thành công (để test không phụ thuộc server thật)
    cy.intercept("POST", "**/signup", {
      statusCode: 201, // hoặc 200 tùy backend
      body: { message: "Đăng ký thành công", token: "fake-jwt-token" },
    }).as("registerReq");

    // Điền thông tin
    cy.get('input[placeholder="Nguyen Van A"]').type("Nguyen Van Test");
    cy.get('input[placeholder="example@email.com"]').type(randomEmail);
    cy.get('input[placeholder="Mật khẩu"]').type("Password@123");
    cy.get('input[placeholder="Xác nhận mật khẩu"]').type("Password@123");

    // Click checkbox điều khoản
    // Lưu ý: Checkbox MUI thường bị ẩn input gốc, cần force: true
    cy.get('input[type="checkbox"]').check({ force: true });

    // Submit
    cy.contains("button", "Sign up").click();

    // Assert: Kiểm tra gọi API và chuyển hướng hoặc hiện thông báo
    cy.wait("@registerReq");
    // Giả sử đăng ký xong chuyển về login hoặc trang chủ
    // cy.url().should("include", "/login");
    // Hoặc hiện thông báo
    // cy.contains("Đăng ký thành công").should("be.visible");
  });

  it("2. Bỏ trống các trường input (Validation)", () => {
    // Không điền gì cả, bấm Sign up luôn
    cy.contains("button", "Sign up").click();
    cy.contains(/Password must be at least 8 characters/i).should("be.visible");
  });

  it("3. Email đã tồn tại trong CSDL", () => {
    // Mock API trả về lỗi 409 Conflict hoặc 400 Bad Request
    cy.intercept("POST", "**/signup", {
      statusCode: 409, // Mã lỗi phổ biến khi trùng resource
      body: { message: "Email đã tồn tại trong hệ thống" },
    }).as("checkEmailExist");

    cy.get('input[placeholder="Nguyen Van A"]').type("User Duplicate");

    // Nhập email đã tồn tại theo yêu cầu
    cy.get('input[placeholder="example@email.com"]').type(existingEmail);

    cy.get('input[placeholder="Mật khẩu"]').type("Password@123");
    cy.get('input[placeholder="Xác nhận mật khẩu"]').type("Password@123");
    cy.get('input[type="checkbox"]').check({ force: true });

    cy.contains("button", "Sign up").click();

    // Assert: Chờ API trả về lỗi và kiểm tra UI hiển thị thông báo
    cy.wait("@checkEmailExist");
    cy.contains(/Email đã tồn tại|Account already exists/i).should(
      "be.visible"
    );
  });

  it("4. Mật khẩu không đúng định dạng (Quá ngắn hoặc thiếu ký tự)", () => {
    cy.get('input[placeholder="Nguyen Van A"]').type("User Pass Fail");
    cy.get('input[placeholder="example@email.com"]').type("valid@gmail.com");

    // Nhập mật khẩu yếu (Ví dụ quy định là > 6 ký tự)
    cy.get('input[placeholder="Mật khẩu"]').type("123");
    cy.get('input[placeholder="Xác nhận mật khẩu"]').type("123");

    cy.contains("button", "Sign up").click();

    // Assert
    cy.contains(/Mật khẩu phải có ít nhất|Password must be at least/i).should(
      "be.visible"
    );
  });

  it("5. Mật khẩu và mật khẩu nhập lại không khớp", () => {
    cy.get('input[placeholder="Nguyen Van A"]').type("User Mismatch");
    cy.get('input[placeholder="example@email.com"]').type("match@gmail.com");

    // Nhập 2 mật khẩu khác nhau
    cy.get('input[placeholder="Mật khẩu"]').type("PasswordA@123");
    cy.get('input[placeholder="Xác nhận mật khẩu"]').type("PasswordB@456");

    cy.get('input[type="checkbox"]').check({ force: true });
    cy.contains("button", "Sign up").click();

    // Assert
    cy.contains(/Mật khẩu xác nhận không khớp|Passwords do not match/i).should(
      "be.visible"
    );
  });

  it("6. Điều hướng sang trang Đăng nhập", () => {
    // Kiểm tra link "Sign in"
    cy.contains("Sign in").should("be.visible").click();

    // Assert: Kiểm tra URL đã chuyển sang trang login
    cy.url().should("include", "/login");

    // Kiểm tra UI trang login (Optional)
    // cy.contains("Đăng nhập").should("be.visible");
  });
});
