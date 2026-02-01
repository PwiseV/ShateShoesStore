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
