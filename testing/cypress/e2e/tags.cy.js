describe("Cypress Tests repeated from React assignment", () => {

    beforeEach(() => {
        cy.exec("node ../server/init.js");
      });
    
      afterEach(() => {
        cy.exec("node ../server/destroy.js");
      });
      
it("Go to question in tag react", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    // all question no. should be in the page
    cy.contains("Tags").click();
    cy.contains("react").click();
    cy.contains("Programmatically navigate using React router");
  });

  it("Go to questions in tag storage", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    // all question no. should be in the page
    cy.contains("Tags").click();
    cy.contains("storage").click();
    cy.contains("Quick question about storage on android");
    cy.contains("Object storage for a web application");
  });

  it("Create a new question with a new tag and finds the question through tag", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    // add a question with tags
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question A");
    cy.get("#formTextInput").type("Test Question A Text");
    cy.get("#formTagInput").type("test1-tag1");
    cy.get("#formUsernameInput").type("mks1");
    cy.contains("Post Question").click();

    // clicks tags
    cy.contains("Tags").click();
    cy.contains("test1-tag1").click();
    cy.contains("Test Question A");
  });

  it("Clicks on a tag and verifies the tag is displayed", () => {
    const tagNames = "javascript";

    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.contains("Tags").click();

    cy.contains(tagNames).click();
    cy.get(".question_tags").each(($el, index, $list) => {
      cy.wrap($el).should("contain", tagNames);
    });
  });

  it("Clicks on a tag in homepage and verifies the questions related tag is displayed", () => {
    const tagNames = "storage";

    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    //clicks the 3rd tag associated with the question.
    cy.get(".question_tag_button").eq(2).click();

    cy.get(".question_tags").each(($el, index, $list) => {
      cy.wrap($el).should("contain", tagNames);
    });
  });

})