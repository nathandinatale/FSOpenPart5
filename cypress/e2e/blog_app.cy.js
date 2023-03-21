import blogs from "../support/blogs";

describe("Blog app", function () {
  beforeEach(function () {
    // send a POST request to the endpoint that resets the testing database here
    cy.request("POST", "http://localhost:3000/api/testing/reset");
    cy.clearAllLocalStorage();
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

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.createUser(
        Cypress.env("username"),
        Cypress.env("password"),
        Cypress.env("user_fullname")
      );
      cy.login(Cypress.env("username"), Cypress.env("password"));
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();

      cy.get("#title").type("Will the Leafs beat the Lightning?");
      cy.get("#author").type("Eliotte Friedman");
      cy.get("#url").type("leafs.ca");

      cy.get("form").submit();

      cy.contains("Will the Leafs beat the Lightning?");
    });

    it("A blog can be liked", function () {
      cy.addBlogs(blogs);
      cy.reload();

      cy.contains("show").click();
      cy.contains("like").click();

      cy.contains("likes 1");
    });
  });
});
