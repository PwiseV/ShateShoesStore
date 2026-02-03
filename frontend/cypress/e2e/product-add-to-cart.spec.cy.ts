describe("Tính năng Tìm kiếm và Giỏ hàng", () => {
  // Giữ nguyên phần đăng nhập như code mẫu của bạn
  beforeEach(() => {
    cy.visit("/login");
    cy.contains("Chờ chút nhé", { timeout: 10000 }).should("not.exist");
    cy.get('input[type="email"]').type("longnguyenha555@gmail.com");
    cy.get('input[type="password"]').type("Nguyen@123");
    cy.get('button[type="submit"]').click();
  });

  it("Tìm kiếm sản phẩm theo tên và hiển thị đúng trong giỏ hàng", () => {
    // 1. Điều hướng đến trang Sản phẩm
    cy.log("Chuyển đến trang danh sách sản phẩm...");
    cy.contains("Sản phẩm").click();

    // Đợi danh sách load xong
    cy.wait(1000);

    // 2. Tìm kiếm sản phẩm
    // LƯU Ý: Bạn cần thay thế selector bên dưới cho đúng với ô input search trên web của bạn
    // Ví dụ: cy.get('.search-input') hoặc cy.get('input[placeholder="Tìm kiếm..."]')
    cy.log("Thực hiện tìm kiếm...");
    cy.get('input[type="text"], input[placeholder*="Tìm"]')
      .first() // Lấy ô input đầu tiên tìm thấy (nếu có nhiều ô)
      .clear()
      .type("Dép Tông Nam Chữ");

    // Đợi kết quả tìm kiếm được lọc (giả lập người dùng dừng gõ hoặc nhấn enter)
    cy.wait(2000);

    // 3. Kiểm tra kết quả và Click vào chi tiết sản phẩm
    cy.log("Chọn sản phẩm từ kết quả tìm kiếm...");
    cy.contains("Dép Tông Nam Chữ").should("be.visible").click();

    // 4. Thêm vào giỏ hàng
    cy.log("Thêm sản phẩm vào giỏ...");
    cy.contains("Thêm vào giỏ hàng").should("be.visible").click();

    // Kiểm tra thông báo thêm thành công (nếu có toast message)
    // cy.contains("Thêm vào giỏ hàng thành công").should("be.visible");

    // 5. Truy cập giỏ hàng để kiểm tra
    cy.log("Vào giỏ hàng kiểm tra...");
    cy.get('a[href="/cart"]').should("be.visible").click();

    // 6. Assertions (Khẳng định kết quả)
    // - Check URL đúng là trang cart
    cy.url().should("include", "/cart");

    // - Check tên sản phẩm có trong giỏ
    cy.contains("Dép Tông Nam Chữ").should("be.visible");

    // - Check giá tiền (Optional - thay đổi số tiền đúng với giá sản phẩm)
    // cy.contains("170,000đ").should("be.visible");
  });
  it("Hiển thị thông báo khi tìm kiếm sản phẩm không tồn tại", () => {
    cy.visit("/products"); // Hoặc điều hướng qua menu như code cũ

    cy.log("Tìm từ khóa không có trong data...");
    cy.get('input[type="text"]').type("Sản phẩm tào lao bí đao 123{enter}");

    cy.wait(1000);

    // Assert: Kiểm tra danh sách rỗng hoặc thông báo
    // Bạn cần sửa text bên dưới đúng với web của bạn (VD: "No data", "Không tìm thấy", v.v.)
    cy.get("body").then(($body) => {
      if ($body.find(".product-item").length > 0) {
        throw new Error("Lỗi: Vẫn hiển thị sản phẩm dù từ khóa sai!");
      }
    });

    // Hoặc check thông báo cụ thể
    cy.contains(/Không tìm thấy|No result|Trống/i).should("be.visible");
  });
  it("Tăng số lượng sản phẩm đến mức tối đa (Max Tồn kho) và kiểm tra chặn click", () => {
    // 1. Setup: Thêm sản phẩm vào giỏ hàng (như cũ)
    cy.contains("Sản phẩm").click();
    cy.contains("Dép Tông Nam Chữ").click();
    cy.contains("Thêm vào giỏ hàng").click();
    cy.get('a[href="/cart"]').click();

    // 2. Xác định phạm vi (Scope) là dòng chứa sản phẩm này
    cy.contains("p", "Dép Tông Nam Chữ")
      .parents(".MuiBox-root") // Tìm lên container cha bao bọc cả tên, giá và bộ điều khiển số lượng
      .last() // Đôi khi MUI lồng nhiều Box, .last() hoặc .eq() giúp lấy đúng container bao ngoài cùng của item đó
      .within(() => {
        // --- BẮT ĐẦU XỬ LÝ TRONG PHẠM VI SẢN PHẨM ---

        // Bước A: Lấy số lượng Tồn kho (Text dạng "(Tồn kho 35)")
        cy.contains("span", "Tồn kho")
          .invoke("text")
          .then((stockText) => {
            // Dùng Regex lấy các con số từ chuỗi text. VD: "(Tồn kho 35)" -> 35
            const maxStock = parseInt(stockText.match(/\d+/)[0]);
            cy.log(`Số lượng tồn kho là: ${maxStock}`);

            // Bước B: Lấy số lượng hiện tại
            // Tìm nút cộng trước để định vị (Icon path dấu cộng)
            cy.get('svg path[d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"]')
              .parents("button")
              .as("plusBtn"); // Đặt alias cho nút cộng để dùng sau

            // Tìm số lượng hiện tại (thẻ p nằm trước nút cộng)
            cy.get("@plusBtn")
              .prev("p")
              .invoke("text")
              .then((qtyText) => {
                let currentQty = parseInt(qtyText);
                cy.log(`Số lượng hiện tại: ${currentQty}`);

                const clicksNeeded = maxStock - currentQty;

                // Bước C: Loop click cho đến khi đạt max
                if (clicksNeeded > 0) {
                  // Dùng Lodash times hoặc vòng lặp for đơn giản
                  for (let i = 0; i < clicksNeeded; i++) {
                    cy.get("@plusBtn").click();
                    // Wait nhỏ để UI kịp cập nhật số và disable state (quan trọng)
                    cy.wait(200);
                  }
                }
              });
          });

        // Bước D: Assert - Kiểm tra nút cộng đã bị Disable
        cy.get('svg path[d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"]')
          .parents("button")
          .should("be.disabled"); // Kiểm tra thuộc tính disabled của HTML button
      });
  });

  it("Xóa sản phẩm khỏi giỏ hàng thành công", () => {
    // Setup: Thêm 1 sản phẩm vào giỏ trước
    cy.contains("Sản phẩm").click();
    cy.contains("Dép Tông Nam Chữ").click();
    cy.contains("Thêm vào giỏ hàng").click();
    cy.get('a[href="/cart"]').click();

    // Kiểm tra sản phẩm có tồn tại trước khi xóa
    cy.contains("p", "Dép Tông Nam Chữ").should("be.visible");

    // Hành động: Xóa
    cy.log("Thực hiện xóa sản phẩm...");

    // Chiến thuật: Tìm dòng chứa sản phẩm -> Tìm nút xóa màu đỏ (MuiIconButton-colorError)
    cy.contains("p", "Dép Tông Nam Chữ")
      .parents(".MuiBox-root") // Lên container cha
      .find("button.MuiIconButton-colorError") // Class đặc trưng của nút xóa trong đoạn HTML bạn đưa
      .click();

    // Nếu có popup xác nhận xóa thì mở comment dòng dưới
    // cy.contains("button", "Đồng ý").click();

    // Assert:
    // 1. Sản phẩm không còn hiển thị
    cy.contains("p", "Dép Tông Nam Chữ").should("not.exist");

    // 2. Giỏ hàng hiển thị trạng thái trống
    // (Đoạn này tùy thuộc text web bạn hiển thị khi trống)
    cy.contains(/Giỏ hàng trống|Chưa có sản phẩm/i).should("be.visible");
  });
});
