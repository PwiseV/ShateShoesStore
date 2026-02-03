describe("Tính năng Thanh toán trực tuyến (Mock PayOS Polling)", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.contains("Chờ chút nhé", { timeout: 10000 }).should("not.exist");
    cy.get('input[type="email"]').type("longnguyenha555@gmail.com");
    cy.get('input[type="password"]').type("Nguyen@123");
    cy.get('button[type="submit"]').click();
  });

  it("Hiển thị khung thanh toán nhúng (Iframe) chứa link chuyển hướng đúng về trang thành công", () => {
    cy.intercept("GET", "**/*orders/*", {
      statusCode: 200,
      body: {
        id: "ORDER_MOCK_DATA",
        status: "PAID",
        totalAmount: 110000,
        items: [{ name: "Giày Nike Air Force 1", price: 250000, quantity: 2 }],
        customerName: "Nguyễn Văn A",
        message: "Thanh toán thành công",
      },
    }).as("getOrderDetail");

    // MOCK API PAYOS
    cy.intercept(
      "POST",
      "https://pay.payos.vn/api/web/*/check-status/",
      (req) => {
        req.reply({
          statusCode: 200,
          body: {
            code: "00",
            desc: "Thanh toán thành công",
            data: {
              status: "PAID",
              amount: 110000,
            },
          },
        });
      }
    ).as("payosPolling");

    cy.log("Đang đi mua hàng...");
    cy.contains("Sản phẩm").click();
    cy.contains("Dép Tông Nam Chữ").click();
    cy.contains("Thêm vào giỏ hàng").click();
    cy.get('a[href="/cart"]').should("be.visible").click();
    cy.wait(3000);
    cy.contains("button", "Tiến hành đặt hàng").click();
    cy.wait(3000);

    cy.get('input[placeholder="Nhập họ tên người nhận"]')
      .clear()
      .type("Nguyễn Văn A");
    cy.get('input[placeholder="Nhập số điện thoại"]')
      .clear()
      .type("0901234567");
    cy.get('textarea[placeholder="Số nhà, tên đường, phường/xã..."]')
      .clear()
      .type("HCM");

    cy.contains("button", "Đặt hàng").click();

    // KÍCH HOẠT THANH TOÁN
    cy.contains("button", "Xác nhận thanh toán").click();

    cy.get('iframe[src*="pay.payos.vn"]', { timeout: 15000 }).should(
      "be.visible"
    );

    // ĐỢI VÀ CHECK KẾT QUẢ
    cy.wait("@payosPolling", { timeout: 20000 }).then((interception) => {
      // Log ra để debug nếu cần
      cy.log("Đã bắt được request polling PayOS");
    });

    cy.get(
      'iframe[src*="redirect_uri=https://shate-shoes-store.vercel.app/order-success"]'
    ).should("be.visible");
  });
  it("Tạo đơn hàng COD thành công và hiển thị đúng chi tiết trong Lịch sử đơn hàng", () => {
    cy.contains("Sản phẩm").click();
    cy.contains("Dép Tông Nam Chữ").click();
    cy.contains("Thêm vào giỏ hàng").click();

    cy.log("Đang đi mua hàng...");
    cy.get('a[href="/cart"]').should("be.visible").click();
    cy.contains("button", "Tiến hành đặt hàng").click();

    cy.get('input[placeholder="Nhập họ tên người nhận"]')
      .clear()
      .type("Nguyễn Văn A");
    cy.get('input[placeholder="Nhập số điện thoại"]')
      .clear()
      .type("0901234567");
    cy.get('textarea[placeholder="Số nhà, tên đường, phường/xã..."]')
      .clear()
      .type("HCM");

    cy.contains("button", "Đặt hàng").click();
    cy.wait(3000);
    cy.contains("div", "Thanh toán khi nhận hàng (COD)").click();
    cy.wait(3000);

    // KÍCH HOẠT THANH TOÁN
    cy.contains("button", "Xác nhận thanh toán").click();
    cy.wait(3000);

    // ĐỢI VÀ CHECK KẾT QUẢ

    cy.contains("Đặt hàng thành công", { timeout: 10000 }).should("be.visible");

    // Đợi chuyển sang màn hình History (sau 5s)
    cy.url({ timeout: 15000 }).should("not.include", "/checkout");
    cy.wait(5000);

    cy.log("Đang kiểm tra thông tin đơn hàng trong History...");
    cy.contains("Dép Tông Nam Chữ").parents(".MuiBox-root").first();

    // Check trạng thái đơn hàng
    cy.contains("Chờ xác nhận").should("be.visible");

    // Check Mã đơn hàng (Format: ORD-...)
    cy.contains(/Mã đơn hàng: ORD-\d+/).should("be.visible");

    // Check Địa chỉ (HCM) - Data nhập ở bước 3
    cy.contains("HCM").should("be.visible");

    // Check Tổng tiền (10,000đ)
    cy.contains("170,000đ").should("be.visible");

    // Check Số lượng (x1)
    cy.contains("x2").should("be.visible");
  });
});
