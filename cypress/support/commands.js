// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add("createUser", (username, password, name) => {
  cy.request("POST", "http://localhost:3000/api/users", {
    username,
    password,
    name,
  });
});

Cypress.Commands.add("login", (username, password) => {
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("#login-button").click();

  // Although the above will log the user in, using the request to obtain the token
  // Had issues getting access to the local storage token when loggin in through UI
  cy.request("POST", "http://localhost:3000/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
  });
});

Cypress.Commands.add("addBlogs", (blogs) => {
  blogs.forEach((blog) => {
    console.log(localStorage.getItem("loggedBlogappUser"));
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/blogs",
      body: blog,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loggedBlogappUser")).token
        }`,
      },
    });
  });
});
