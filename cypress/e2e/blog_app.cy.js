describe("Blog app", function () {
  beforeEach(function () {
    // send a POST request to the endpoint that resets the testing database here
    cy.request("POST", "http://localhost:3000/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });
});
