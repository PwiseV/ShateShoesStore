describe("Chức năng Danh sách sản phẩm", () => {
  beforeEach(() => {
    cy.visit("/products");
  });

  it("Nên mở danh mục Giày Tây và chọn danh mục con Giày Loafer", () => {
    cy.contains(".MuiBox-root", "Danh Mục").should("be.visible");

    cy.get(".MuiListItemButton-root")
      .contains("p.MuiTypography-root", "Giày Tây")
      .click();

    cy.get(".MuiListItemButton-root")
      .contains(".MuiListItemButton-root", "Giày Loafer")
      .should("be.visible")
      .click();

    cy.url().should("include", "giay-loafer");
    cy.get(".MuiGrid-grid-xs-12").should("have.length.at.least", 1);
  });

  it("Nên mở danh mục Giày Thể Thao và chọn danh mục con Giày Lifestyle và hiển thị thông báo trống", () => {
    cy.contains(".MuiBox-root", "Danh Mục").should("be.visible");

    cy.get(".MuiListItemButton-root")
      .contains("p.MuiTypography-root", "Giày Thể Thao")
      .click();

    cy.get(".MuiListItemButton-root")
      .contains(".MuiListItemButton-root", "Giày Lifestyle")
      .should("be.visible")
      .click();

    cy.url().should("include", "giay-lifestyle");
    cy.get(".MuiTypography-root")
      .contains("Không tìm thấy sản phẩm nào")
      .should("be.visible");
  });

  it("Nên chuyển sang trang chi tiết khi nhấn vào sản phẩm", () => {
    cy.get(".MuiGrid-grid-xs-12").find(".MuiPaper-root").find(".MuiTypography-root") // Tìm các thẻ chữ
    .contains(/./).first().click();
    cy.url().should("include", "/products/details/");
  });
});
