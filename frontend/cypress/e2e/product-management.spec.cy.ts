describe("Tính năng Quản lý sản phẩm", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.contains("Chờ chút nhé", { timeout: 10000 }).should("not.exist");
    cy.get('input[type="email"]').type("admin@gmail.com");
    cy.get('input[type="password"]').type("123456");
    cy.intercept("GET", "**/api/admin/products*").as("getProducts");
    cy.get('button[type="submit"]').click();
    cy.contains("button", "Quản lý sản phẩm").click();
    cy.wait("@getProducts").its("response.statusCode").should("eq", 200);
  });
  it("Test Case 1: Hiển thị đúng giao diện Quản lý sản phẩm và danh sách dữ liệu", () => {
    // Check tiêu đề trang là h5
    cy.get("h5").contains("Quản lý sản phẩm").should("be.visible");

    // Check nút "Thêm mới" và "Bộ lọc"
    cy.contains("button", "Thêm mới").should("be.visible");
    cy.contains("button", "Bộ lọc").should("be.visible");

    // Check ô tìm kiếm hiển thị đúng placeholder
    cy.get('input[placeholder="Tìm theo tên/mã SP..."]').should("be.visible");

    // Đảm bảo các cột quan trọng đều hiện ra
    const tableHeaders = [
      "Mã SP",
      "Hình",
      "Tên sản phẩm",
      "Giá",
      "Tồn kho",
      "Tùy chỉnh",
    ];
    tableHeaders.forEach((header) => {
      cy.contains(header).should("be.visible");
    });

    // Check sản phẩm cụ thể
    cy.contains("p", "BH001")
      .parents("div[class*='MuiBox-root']")
      .first()
      .within(() => {
        // Check tên sản phẩm
        cy.contains("Giày bảo hộ").should("be.visible");

        // Check giá tiền
        cy.contains("500,000").should("be.visible");

        // Check loại
        cy.contains("Giày bảo hộ").should("be.visible");

        // Check tồn kho
        cy.contains("68").should("be.visible");

        // Check Size
        cy.get('[role="combobox"]').should("have.text", "39");

        // Check ảnh có hiển thị (check src có chứa link ảnh)
        cy.get("img")
          .should("be.visible")
          .and("have.attr", "src")
          .and("include", "cloudinary");
      });

    // KIỂM TRA PHÂN TRANG
    cy.get("nav[aria-label='pagination navigation']").should("be.visible");
    // Check trang 1 đang được active (selected)
    cy.get("button[aria-current='page']").should("contain", "1");
  });
  it("Test Case 2: Lọc sản phẩm bằng cách nhập từ khóa và nhấn Enter", () => {
    cy.log("1. Tìm kiếm sản phẩm tồn tại: SP_TEST_NEW_01");
    cy.get('input[placeholder="Tìm theo tên/mã SP..."]')
      .clear()
      .type("BH001{enter}");
    // Đợi UI cập nhật
    cy.wait(1000);

    // VERIFY KẾT QUẢ ĐÚNG:
    cy.contains("BH001").should("be.visible");
    cy.contains("Giày bảo hộ").should("be.visible");

    // VERIFY KẾT QUẢ LOẠI TRỪ:
    cy.contains("SU001").should("not.exist");
    cy.contains("Crocsity").should("not.exist");

    cy.log("2. Tìm kiếm sản phẩm không tồn tại");

    cy.get('input[placeholder="Tìm theo tên/mã SP..."]')
      .clear()
      .type("MÃ_KHÔNG_TỒN_TẠI_999{enter}");

    cy.wait(1000);

    // Verify: Không còn dòng sản phẩm nào hiển thị
    cy.contains("Không tìm thấy sản phẩm nào").should("be.visible");

    cy.log("3. Xóa tìm kiếm để hiện lại toàn bộ");

    cy.get('input[placeholder="Tìm theo tên/mã SP..."]')
      .clear()
      .type("{enter}");

    cy.wait(1000);

    cy.contains("BH001").should("be.visible");
    cy.contains("SU001").should("be.visible");
  });
  it("Test Case 3: Lọc sản phẩm theo Loại (Danh mục sản phẩm)", () => {
    cy.log("1. Mở popup bộ lọc");
    cy.contains("button", "Bộ lọc").click();
    cy.contains("Danh mục sản phẩm").should("be.visible");

    cy.log("2. Chọn radio button 'Giày Cao Gót'");
    cy.contains("label", "Giày Cao Gót").click();

    // Kiểm tra xem radio button "Giày Cao Gót" đã được checked chưa
    cy.get('input[value="Giày Cao Gót"]').should("be.checked");

    // Đảm bảo "Tất cả danh mục" KHÔNG còn được chọn
    cy.get('input[value="All"]').should("not.be.checked");
    cy.contains("button", "Áp dụng").click();

    // Đợi danh sách load lại
    cy.wait(1000);

    cy.log("3. Kiểm tra dữ liệu sau khi lọc");

    // Verify cái cần hiện phải hiện
    cy.contains("CG001").should("be.visible");
    cy.contains("Giày Cao Gót Khoét Eo").should("be.visible");

    // Verify Cái không thuộc danh mục phải ẩn
    cy.contains("Giày bảo hộ").should("not.exist");
    cy.contains("Crocsity").should("not.exist");
  });
  it("Test Case 4: Tạo mới sản phẩm thành công", () => {
    cy.log("1. Click nút Thêm mới");
    cy.contains("button", "Thêm mới").click();

    cy.log("2. Verify Modal 'Thêm Sản Phẩm Mới' hiển thị");
    cy.contains('[role="dialog"]', "Thêm Sản Phẩm Mới").as("addProductModal");
    cy.get("@addProductModal").should("be.visible");

    cy.log("3. Điền thông tin form");
    cy.get("@addProductModal").within(() => {
      cy.get('input[type="file"]').selectFile(
        "cypress/fixtures/giay-moca-miu-den-nu.avif",
        { force: true }
      );
      cy.contains("label", "Mã sản phẩm")
        .parent()
        .find("input")
        .type("SP_TEST_NEW_01");

      // Nhập Tên sản phẩm
      cy.contains("label", "Tên sản phẩm")
        .parent()
        .find("input")
        .type("Giày Thể Thao Test Cypress");

      // Chọn Danh mục (Mở dropdown)
      cy.contains("label", "Danh mục")
        .parent()
        .find('[role="combobox"]')
        .click();
    });

    cy.contains('li[role="option"]', "Giày Bóng Rổ").click();

    cy.get("@addProductModal").within(() => {
      // Nhập Mô tả tóm tắt
      cy.contains("label", "Mô tả tóm tắt")
        .parent()
        .find("textarea")
        .first()
        .type("Sản phẩm được tạo tự động bởi Cypress Test.");

      // Nhập Tags
      cy.get('input[placeholder*="Nhập tag"]').type(
        "New Arrival{enter}Sale{enter}"
      );

      // Click Lưu sản phẩm
      cy.contains("button", "Lưu sản phẩm").click();
    });

    cy.log("6. Verify tạo thành công");

    // Modal phải đóng lại
    cy.get("@addProductModal").should("not.exist");

    // Chờ grid reload
    cy.wait(2000);

    // Tìm dòng chứa Mã sản phẩm vừa tạo
    cy.get('input[placeholder="Tìm theo tên/mã SP..."]')
      .clear()
      .type("SP_TEST_NEW_01{enter}");

    // Đợi UI cập nhật
    cy.wait(2000);
    cy.contains(".MuiBox-root", "SP_TEST_NEW_01");
  });
  it("Test Case 5a: Chỉnh sửa thông tin cơ bản (Tên, Mô tả, Danh mục, Tags)", () => {
    const productId = "SP_TEST_NEW_01";
    const oldName = "Giày Thể Thao Test Cypress";
    const newName = "Giày bảo hộ Version 2024";

    cy.log("1. Tìm sản phẩm và mở form sửa");
    cy.get('input[placeholder="Tìm theo tên/mã SP..."]')
      .clear()
      .type(`${productId}{enter}`);
    cy.wait(2000);

    cy.contains(".MuiBox-root", productId).within(() => {
      cy.get('path[d^="M3 17.25"]').parents("button").click();
    });

    cy.log("2. Cập nhật Tên, Mô tả, Danh mục, Tags");
    cy.get('[role="dialog"]').within(() => {
      // Sửa Tên
      cy.contains("label", "Tên sản phẩm")
        .parent()
        .find("input")
        .clear()
        .type(newName);

      // Sửa Mô tả
      cy.contains("label", "Mô tả sản phẩm")
        .parent()
        .find("textarea")
        .first()
        .clear()
        .type("Chất liệu cao cấp, phiên bản giới hạn.");

      // Đổi Danh mục
      cy.contains("label", "Danh mục")
        .parent()
        .find('[role="combobox"]')
        .click();
    });
    // Chọn danh mục
    cy.contains('li[role="option"]', "Giày Búp Bê").click();

    // Thêm Tag
    cy.get('[role="dialog"]').within(() => {
      cy.contains("label", "Thêm Tags")
        .parent()
        .find("input")
        .type("Hot Trend{enter}");

      cy.contains("button", "Cập nhật thông tin chính").click();
    });

    // VERIFY KẾT QUẢ ---
    cy.log("3. Verify thông tin sau khi lưu");
    cy.get('[role="dialog"]', { timeout: 10000 }).should("not.exist");
    cy.wait(2000);

    // Kiểm tra dòng chứa ID phải có Tên mới và Danh mục mới
    cy.contains("p", productId)
      .parent()
      .within(() => {
        cy.contains("p", newName).should("be.visible");
        cy.contains("p", "Giày Búp Bê").should("be.visible");
      });

    cy.log("4. Clean up: Trả lại tên và danh mục cũ");
    cy.contains("p", productId)
      .parent()
      .find('path[d^="M3 17.25"]')
      .parents("button")
      .click();

    cy.get('[role="dialog"]').within(() => {
      cy.contains("label", "Tên sản phẩm")
        .parent()
        .find("input")
        .clear()
        .type(oldName);
      cy.contains("label", "Danh mục")
        .parent()
        .find('[role="combobox"]')
        .click();
    });
    cy.contains('li[role="option"]', "Giày Bóng Rổ").click();

    cy.get('[role="dialog"]')
      .contains("button", "Cập nhật thông tin chính")
      .click();
  });
  it("Test Case 5b: Thêm biến thể (Size & Màu) cho sản phẩm", () => {
    const productId = "SP_TEST_NEW_01";

    cy.get('input[placeholder="Tìm theo tên/mã SP..."]')
      .clear()
      .type(`${productId}{enter}`);
    cy.wait(2000);
    cy.contains(".MuiBox-root", productId).within(() => {
      cy.get('path[d^="M3 17.25"]').parents("button").click();
    });

    cy.log("2. Thêm Size 41");
    cy.get('[role="dialog"]').within(() => {
      // Nhập size và click Thêm
      cy.get('input[placeholder="Nhập size mới..."]').type("41");
      cy.get('input[placeholder="Nhập size mới..."]')
        .parents(".MuiBox-root")
        .first()
        .find("button")
        .contains("Thêm")
        .click();

      cy.get(".MuiDialogContent-root").scrollTo("bottom");
      cy.contains("p", "Size: 41").should("be.visible");
    });

    cy.log("3. Thêm màu Hồng cho Size 41");
    cy.contains(".MuiPaper-root", "Size: 41")
      .contains("button", "Thêm màu")
      .click();

    // Điền form màu
    cy.get('[role="dialog"]')
      .eq(1)
      .within(() => {
        cy.get('input[type="file"]').selectFile(
          "cypress/fixtures/giay-moca-miu-den-nu.avif",
          { force: true }
        );
        cy.contains("label", "Tên màu sắc")
          .parent()
          .find('[role="combobox"]')
          .click();
      });

    // Chọn màu (ngoài dialog)
    cy.contains('li[role="option"]', "Hồng").click();

    // Điền giá & kho
    cy.get('[role="dialog"]')
      .eq(1)
      .within(() => {
        cy.contains("label", "Giá bán")
          .parent()
          .find("input")
          .clear()
          .type("550000");
        cy.contains("label", "Số lượng kho")
          .parent()
          .find("input")
          .clear()
          .type("100");
        cy.contains("button", "Xác nhận tạo").click();
        cy.wait(5000);
      });

    cy.log("4. Verify biến thể hiển thị đúng");
    cy.contains(".MuiPaper-root", "Size: 41").within(() => {
      // Kiểm tra hiển thị chip: Màu • Số lượng
      cy.contains("Hồng • 1000").should("be.visible");
    });

    cy.contains("button", "Cập nhật thông tin chính").click();
  });
  it("Test Case 6: Delete sản phẩm (Clean up biến thể trước)", () => {
    const productId = "SP_TEST_NEW_01";

    cy.log("1. Mở form sửa để xóa biến thể con trước");
    cy.get('input[placeholder="Tìm theo tên/mã SP..."]')
      .clear()
      .type(`${productId}{enter}`);
    cy.wait(2000);

    // Click nút Sửa
    cy.contains("p", productId)
      .parent()
      .within(() => {
        cy.get('path[d^="M3 17.25"]').parents("button").click();
      });

    // XÓA CÁC SIZE/BIẾN THỂ
    cy.get("body").then(($body) => {
      const variantContainer = $body.find(".MuiBox-root.css-1mcghfl");

      if (variantContainer.length > 0) {
        // Tìm xem có thẻ Chip (MuiChip-root) nào không.
        const variantChips = variantContainer.find(".MuiChip-root");

        if (variantChips.length > 0) {
          cy.log(
            `Phát hiện ${variantChips.length} biến thể, thực hiện click để xóa...`
          );
          cy.wrap(variantChips).first().click();
          cy.contains("button", "Xóa biến thể").should("be.visible").click();

          // 5. Lưu lại form chính để DB cập nhật
          cy.contains("button", "Cập nhật thông tin chính").click();
          cy.wait(2000); // Đợi lưu xong
        } else {
          cy.log("Chỉ có nút Thêm màu, không có biến thể nào để xóa.");
          cy.get("body").click(0, 0);
        }
      } else {
        cy.log("Không tìm thấy vùng chứa biến thể.");
        cy.get("body").click(0, 0);
      }
    });
    cy.log("2. Quay lại list và thực hiện Xóa sản phẩm cha");
    cy.get('input[placeholder="Tìm theo tên/mã SP..."]')
      .clear()
      .type(`${productId}{enter}`);
    cy.wait(2000);

    // XÓA SẢN PHẨM
    cy.on("window:confirm", () => true); // Auto accept confirm

    cy.contains("p", productId)
      .parent()
      .within(() => {
        cy.get('path[d^="M6 19"]').parents("button").click();
      });

    // VERIFY
    cy.wait(2000);
    cy.contains(".MuiBox-root", productId).should("not.exist");
    cy.contains("Không tìm thấy sản phẩm nào").should("be.visible");
  });
});
