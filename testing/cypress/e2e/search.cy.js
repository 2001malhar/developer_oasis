describe("Cypress Tests repeated from React assignment", () => {

    beforeEach(() => {
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
      });
    
      afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });
it("Search for a question using text content that does not exist", () => {
    const searchText = "Web3";

    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.get("#searchBar").type(`${searchText}{enter}`);
    cy.get(".postTitle").should("have.length", 0);
  });

  it("Search string in question text", () => {
    const qTitles = ["Object storage for a web application"];
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.get("#searchBar").type("40 million{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Search string in question text", () => {
    const qTitles = ["Quick question about storage on android"];
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.get("#searchBar").type("data remains{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Search a question by tag (t1)", () => {
    const qTitles = ["Programmatically navigate using React router"];
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.get("#searchBar").type("[react]{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Search a question by tag (t2)", () => {
    const qTitles = [
      "android studio save string shared preference, start activity and load the saved string",
      "Programmatically navigate using React router",
    ];
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.get("#searchBar").type("[javascript]{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it(" Search a question by tag (t3)", () => {
    const qTitles = [
      "Quick question about storage on android",
      "android studio save string shared preference, start activity and load the saved string",
    ];
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.get("#searchBar").type("[android-studio]{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Search a question by tag (t4)", () => {
    const qTitles = [
      "Quick question about storage on android",
      "android studio save string shared preference, start activity and load the saved string",
    ];
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.get("#searchBar").type("[shared-preferences]{enter}");
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });

  it("Search for a question using a tag that does not exist", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.get("#searchBar").type("[nonExistentTag]{enter}");
    cy.get(".postTitle").should("have.length", 0);
  });

})