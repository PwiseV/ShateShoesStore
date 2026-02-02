/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
// cypress/support/commands.js

Cypress.Commands.add("clickMenuAndCheck", (labelText, expectedPath) => {
  // 1. Log ra màn hình để dễ debug
  cy.log(`👉 Click vào menu: ${labelText}`);

  // 2. Tìm thẻ chứa text, đảm bảo nó hiển thị rồi mới click
  // Dùng .closest('a') để click vào thẻ link an toàn hơn
  cy.contains(labelText).closest("a").should("be.visible").click();

  // 3. Đợi UI hiển thị bằng cách kiểm tra URL
  // Đây là cách "đợi" tổng quan và chính xác nhất cho việc chuyển trang
  cy.url().should("include", expectedPath);
});
