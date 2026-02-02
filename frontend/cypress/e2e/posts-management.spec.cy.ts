describe("Tính năng Quản lý bài viết", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.contains("Chờ chút nhé", { timeout: 10000 }).should("not.exist");
    cy.get('input[type="email"]').type("admin@gmail.com");
    cy.get('input[type="password"]').type("123456");
    cy.intercept("GET", "**/api/admin/posts*").as("getPosts");
    cy.get('button[type="submit"]').click();
    cy.contains("button", "Quản lý bài viết").click();
    cy.wait("@getPosts").its("response.statusCode").should("eq", 200);
  });
  it("Test Case 1: Hiển thị đúng giao diện Quản lý bài viết và danh sách dữ liệu", () => {
    cy.get("h5").should("contain.text", "Quản lý bài viết");
    cy.contains("button", "Thêm mới")
      .should("be.visible")
      .and("have.class", "MuiButton-containedPrimary");

    // Kiểm tra khu vực Tìm kiếm và Bộ lọc
    cy.get('input[placeholder="Tìm kiếm tiêu đề bài viết..."]').should(
      "be.visible"
    );
    cy.contains("button", "Bộ lọc").should("be.visible");

    // Kiểm tra Header của bảng
    cy.contains(".MuiBox-root", "#")
      .parent()
      .within(() => {
        cy.contains("Tiêu đề bài viết").should("be.visible");
        cy.contains("Danh mục").should("be.visible");
        cy.contains("Nội dung tóm tắt").should("be.visible");
        cy.contains("Tác giả").should("be.visible");
        cy.contains("Trạng thái").should("be.visible");
        cy.contains("Tùy chỉnh").should("be.visible");
      });

    // Kiểm tra dữ liệu hiển thị ở dòng đầu tiên
    cy.contains("10 Cách Phối Đồ Với Giày Giúp Bạn Luôn Thời Trang Và Tự Tin")
      .parents(".MuiBox-root")
      .first()
      .parent()
      .within(() => {
        // Kiểm tra số thứ tự
        cy.contains("1").should("be.visible");

        // Kiểm tra ngày tháng
        cy.contains("08-02-2026").should("be.visible");

        // Kiểm tra Danh mục (Chip)
        cy.contains(".MuiChip-root", "Xu hướng").should("be.visible");

        // Kiểm tra nội dung tóm tắt (cắt ngắn)
        cy.contains("Giày không chỉ là phụ kiện").should("be.visible");

        // Kiểm tra Tác giả
        cy.contains("Huỳnh Hương").should("be.visible");

        // Kiểm tra Trạng thái (Ẩn)
        cy.contains("Ẩn").should("be.visible");

        // Kiểm tra nút hành động (Sửa và Xóa)
        cy.get("button.MuiIconButton-root").should("have.length", 2);
      });

    // 6. Kiểm tra dữ liệu ở các dòng khác
    cy.contains("Giày công sở – Chìa khóa cho phong cách chuyên nghiệp").should(
      "be.visible"
    );
    cy.contains("SHATE Editorial").should("be.visible");
    cy.contains(".MuiChip-root", "Review").should("be.visible");
    cy.contains("Hiển thị").should("be.visible");

    // Kiểm tra phân trang (Pagination)
    cy.contains(".MuiBox-root", "1")
      .parent()
      .within(() => {
        cy.contains("1").should("be.visible");
        cy.contains("2").should("be.visible");
      });
  });
  it("Test Case 2: Lọc bài viết bằng cách nhập từ khóa và nhấn Enter", () => {
    const keyword = "Sandal";

    // Tìm ô tìm kiếm và nhập liệu
    cy.get('input[placeholder="Tìm kiếm tiêu đề bài viết..."]')
      .should("be.visible")
      .clear()
      .type(`${keyword}{enter}`);

    // Kiểm tra kết quả hiển thị
    cy.contains(keyword).should("be.visible");

    // Kiểm tra dữ liệu rác không còn hiển thị
    cy.contains("Giày búp bê").should("not.exist");

    // Kiểm tra input vẫn giữ giá trị sau khi reload
    cy.get('input[placeholder="Tìm kiếm tiêu đề bài viết..."]').should(
      "have.value",
      keyword
    );
  });
  it("Test Case 3: Lọc bài viết theo Danh mục", () => {
    cy.log("1. Mở popup bộ lọc");
    const categoryToFilter = "Phối đồ";
    const categoryToExclude = "Review"; // Một danh mục khác để test xem có bị ẩn không

    cy.contains("button", "Bộ lọc").should("be.visible").click();

    // Kiểm tra Popup đã mở
    cy.get('div[role="dialog"]').within(() => {
      cy.contains("Bộ lọc bài viết").should("be.visible");

      // Chọn danh mục "Phối đồ"
      cy.contains("label", categoryToFilter).click();

      // Kiểm tra xem radio đó đã được check chưa
      cy.contains("label", categoryToFilter)
        .find('input[type="radio"]')
        .should("be.checked");

      cy.contains("button", "Áp dụng").click();
      cy.wait(3000);
    });

    cy.get('div[role="dialog"]').should("not.exist");

    // Kiểm tra kết quả
    cy.get(".MuiChip-root")
      .should("have.length.at.least", 1)
      .each(($chip) => {
        const chipText = $chip.text().trim();

        // So sánh: Text tìm thấy phải chứa từ khóa "Phối đồ"
        expect(chipText).to.contain(categoryToFilter);
      });

    // Kiểm tra dữ liệu rác
    cy.contains(".MuiChip-root", categoryToExclude).should("not.exist");

    cy.contains("button", "Bộ lọc").click();

    cy.get('div[role="dialog"]').within(() => {
      cy.contains("button", "Đặt lại").click();
    });
    cy.contains(".MuiChip-root", categoryToExclude).should("be.visible");
  });
  it("Test Case 4: Tạo mới bài viết thành công", () => {
    // Dữ liệu mẫu để test
    const newPost = {
      title: "Bài viết test tự động Cypress " + new Date().getTime(),
      author: "Robot Tester",
      category: "Xu hướng",
      content: "Đây là nội dung bài viết được tạo tự động bởi Cypress.",
      imageName: "giay-ballet-no-nhieu-mau-nu.avif",
    };

    // Khai báo API tạo mới
    cy.intercept("POST", "**/api/admin/posts*").as("createPosts");

    cy.contains("button", "Thêm mới").click();

    cy.get('div[role="dialog"]').within(() => {
      // Kiểm tra tiêu đề Popup
      cy.contains("Tạo bài viết").should("be.visible");

      // Nhập Tiêu đề
      cy.get('input[placeholder="Nhập tiêu đề..."]')
        .clear()
        .type(newPost.title);

      // Nhập Tác giả
      cy.get('input[placeholder="Nhập tên tác giả..."]')
        .clear()
        .type(newPost.author);

      // Nhập Nội dung chi tiết
      cy.get('textarea[placeholder="Nhập nội dung bài viết..."]')
        .clear()
        .type(newPost.content);

      // Upload ảnh Thumbnail
      cy.get('input[type="file"]').selectFile(
        `cypress/fixtures/${newPost.imageName}`,
        {
          force: true,
        }
      );
      // Kiểm tra tên file đã hiện lên ô input readonly chưa
      cy.get('input[placeholder="Chọn tệp"]').should(
        "contain.value",
        newPost.imageName
      );

      cy.get('div[role="combobox"]').click();
    });
    // Chọn Danh mục
    cy.get('ul[role="listbox"]', { timeout: 10000 })
      .contains("li", newPost.category)
      .click();

    // Submit Form
    cy.get('div[role="dialog"]').within(() => {
      cy.contains("button", "Tạo bài viết").click();
    });

    // Chờ API tạo mới trả về thành công (200 hoặc 201)
    cy.wait("@createPosts")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);

    // Chờ API load lại danh sách (để thấy bài mới)
    cy.wait("@getPosts").its("response.statusCode").should("eq", 200);

    cy.get('div[role="dialog"]').should("not.exist");

    // Kiểm tra bài viết mới đã xuất hiện trong danh sách chưa
    cy.contains(newPost.title).should("be.visible");
    cy.contains(newPost.author).should("be.visible");
  });
  it("Test Case 5: Chỉnh sửa thông tin bài viết", () => {
    const oldTitle = "Bài viết test tự động Cypress"; // Khớp với Test Case 4
    const updatedPost = {
      title: "Đã sửa",
      author: "Robot Tester V2",
      status: "Ẩn",
    };

    cy.log("1. Tìm bài viết cần sửa");
    cy.get('input[placeholder="Tìm kiếm tiêu đề bài viết..."]')
      .clear()
      .type(`${oldTitle}{enter}`);

    cy.wait("@getPosts");
    cy.wait(3000);

    // Mở form chỉnh sửa
    cy.contains(oldTitle)
      .parentsUntil(".MuiStack-root")
      .last()
      .within(() => {
        cy.get('path[d^="M3 17.25"]')
          .closest("button")
          .should("be.visible")
          .click();
      });

    // Thực hiện chỉnh sửa
    cy.get('div[role="dialog"]').within(() => {
      cy.contains("Chỉnh sửa bài viết").should("be.visible");

      // Sửa Tiêu đề
      cy.get('input[placeholder="Nhập tiêu đề..."]')
        .clear()
        .type(updatedPost.title);

      // Sửa Tác giả
      cy.get('input[placeholder="Nhập tên tác giả..."]')
        .clear()
        .type(updatedPost.author);

      // Sửa Trạng thái
      cy.contains("p", "Trạng thái")
        .parent()
        .find('div[role="combobox"]')
        .click();
    });
    cy.get('ul[role="listbox"]').contains("li", updatedPost.status).click();

    // Lưu thay đổi
    cy.get('div[role="dialog"]').within(() => {
      cy.contains("button", "Lưu thay đổi").click();
    });

    // Kiểm tra kết quả
    cy.wait("@getPosts").its("response.statusCode").should("eq", 200);
    cy.get('div[role="dialog"]').should("not.exist");

    // Tìm kiếm lại theo Tiêu đề MỚI để chắc chắn đã cập nhật
    cy.get('input[placeholder="Tìm kiếm tiêu đề bài viết..."]')
      .clear()
      .type(`${updatedPost.title}{enter}`);

    cy.wait("@getPosts");

    // Tiêu đề mới phải xuất hiện
    cy.contains(updatedPost.title).should("be.visible");
  });
  it("Test Case 6: Xóa bài viết", () => {
    const targetTitle = "Đã sửa";

    cy.log("1. Tìm bài viết cần xóa");
    cy.get('input[placeholder="Tìm kiếm tiêu đề bài viết..."]')
      .clear()
      .type(`${targetTitle}{enter}`);

    // Đợi danh sách load xong
    cy.wait(2000);

    // Tìm dòng chứa bài viết và bấm nút Xóa
    cy.contains(targetTitle)
      .parentsUntil(".MuiStack-root")
      .last()
      .within(() => {
        cy.get('path[d^="M6 19"]')
          .closest("button")
          .should("be.visible")
          .click();
      });
    cy.wait(2000);

    // Kiểm tra rằng tiêu đề đó không còn tồn tại trong DOM nữa
    cy.contains(targetTitle).should("not.exist");
    cy.contains("Không tìm thấy bài viết nào").should("be.visible");
  });
});
