describe("Cypress Tests repeated from React assignment", () => {

    beforeEach(() => {
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
      });
    
      afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });



  it("successfully shows all questions in model in Unanswered order", () => {
    cy.visit("http://localhost:3000");

    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Unanswered").click();
    cy.contains("0 questions");
  });

  it("successfully shows all questions in model in active order", () => {
    const qTitles = [
        "Programmatically navigate using React router",
        "android studio save string shared preference, start activity and load the saved string",
        "Quick question about storage on android",
        "Object storage for a web application",
    ];
    cy.visit("http://localhost:3000");

    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Active").click();
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("successfully shows all questions in model in Views order", () => {
    const qTitles = [
        "Object storage for a web application",
        "android studio save string shared preference, start activity and load the saved string",
        "Quick question about storage on android",
      "Programmatically navigate using React router",
    ];
    cy.visit("http://localhost:3000");

    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Views").click();
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("successfully shows all questions in model in Comments order", () => {
    const qTitles = [
        "Programmatically navigate using React router",
        "android studio save string shared preference, start activity and load the saved string",
        "Object storage for a web application",
        "Quick question about storage on android",
    ];
    cy.visit("http://localhost:3000");

    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Discussed").click();
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("successfully shows all questions in model in newest order", () => {
    const qTitles = [
        "Quick question about storage on android",
        "Object storage for a web application",
      "android studio save string shared preference, start activity and load the saved string",
      "Programmatically navigate using React router",
    ];
    cy.visit("http://localhost:3000");

    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Newest").click();
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

})