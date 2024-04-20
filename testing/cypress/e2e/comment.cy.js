describe("Cypress Tests for Comments", () => {

    beforeEach(() => {
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
      });
    
      afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });

it("Clicks on comments and opens comments page", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Comment").click();
    cy.contains("1 Comments")
    cy.contains("Ask a Question");
    cy.contains("104 views");
    cy.contains("I'm facing a similar issue.");
    cy.contains("Add a Comment");
  })

  it("Clicks on comments and opens comments page and add comments", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Comment").click();
    cy.contains("1 Comments")
    cy.contains("Ask a Question");
    cy.contains("104 views");
    cy.contains("I'm facing a similar issue.");
    cy.contains("Add a Comment").click();

    cy.get('#commentUsernameInput').type("user");
    cy.get('#commentTextInput').type("user comment");
    cy.contains("Post Comment").click();

    cy.contains("Comment").click();
    cy.contains("2 Comments")
    cy.contains("Ask a Question");
    cy.contains("105 views");
    cy.contains("user comment");
    cy.contains("user");
    cy.contains("Add a Comment").click();
  })

  it("Clicks on answers, opens answers page,show answer, click comments, add comments and shows comments", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Answer").click();
    cy.contains("Ask a Question");
    cy.contains("104 views");
    cy.contains("Store data in a SQLLite database.");
    cy.contains("Comment").click();
    cy.contains("Add a Comment").click();

    cy.get('#commentUsernameInput').type("user");
    cy.get('#commentTextInput').type("user comment");
    cy.contains("Post Comment").click();

    cy.contains("Comment").click();
    cy.contains("2 Comments")
    cy.contains("Ask a Question");
    cy.contains("user comment");
    cy.contains("user");
    cy.contains("Add a Comment").click();
  })  

  it("Invalidates the invalid link for comment", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Comment").click();
    cy.contains("Add a Comment").click();

    cy.get('#commentUsernameInput').type("user");
    cy.get('#commentTextInput').type("Check this invalid link: [](https://wrong.url)");
    cy.contains("Post Comment").click();
    cy.contains("Invalid hyperlink");
  })

  it("Validates the valid link for comment", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Comment").click();
    cy.contains("Add a Comment").click();

    cy.get('#commentUsernameInput').type("user");
    cy.get('#commentTextInput').type("[Google](https://www.google.com)");
    cy.contains("Post Comment").click();
    // cy.contains("Invalid hyperlink");
    cy.visit("http://localhost:3000");
    cy.contains("Comment").click();
    cy.get('a[href="https://www.google.com"]').should('be.visible');
  })

  it(" Checks Username for comment", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Comment").click();
    cy.contains("Add a Comment").click();

    cy.get('#commentTextInput').type("Google");
    cy.contains("Post Comment").click();
    cy.contains("Username cannot be empty");
  })

  it("Checks Comment Text for comment", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Comment").click();
    cy.contains("Add a Comment").click();

    cy.get('#commentUsernameInput').type("user");
    cy.contains("Post Comment").click();
    cy.contains("Comment cannot be empty");
  })

  it("Checks Comment Text for answer comment", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Answer").click();
    cy.contains("Comment").click();
    cy.contains("Add a Comment").click();


    cy.get('#commentTextInput').type("user");
    cy.contains("Post Comment").click();
    cy.contains("Username cannot be empty");
  })

  it("Checks user Text for answer comment", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Answer").click();
    cy.contains("Comment").click();
    cy.contains("Add a Comment").click();


    cy.get('#commentUsernameInput').type("Google");
    cy.contains("Post Comment").click();
    cy.contains("Comment cannot be empty");
  })

});