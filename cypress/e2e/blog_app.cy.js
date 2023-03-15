describe("Blog app", function () {
  beforeEach(function () {
    // send a POST request to the endpoint that resets the testing database here
    cy.request("POST", "http://localhost:3000/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    beforeEach(function () {
      cy.createUser(
        Cypress.env("username"),
        Cypress.env("password"),
        Cypress.env("user_fullname")
      );
    });
    it("succeeds with correct credentials", function () {
      cy.login(Cypress.env("username"), Cypress.env("password"));

      cy.contains("User John Tavares successfuly logged in");
      cy.get(".notification").should("have.css", "color", "rgb(0, 128, 0)");
    });

    it("fails with wrong credentials", function () {
      cy.login("Username", "Password");

      cy.contains("Incorrect username or password");
      cy.get(".notification").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });
});
