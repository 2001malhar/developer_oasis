describe("Cypress Tests repeated from React assignment", () => {

  beforeEach(() => {
      cy.exec("node ../server/init.js");
    });
  
    afterEach(() => {
      cy.exec("node ../server/destroy.js");
    });
  it(" Created new answer should be displayed at the top of the answers page", () => {
    const answers = [
      "Test Answer 1",
      "Store data in a SQLLite database.",
    ];
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    // cy.contains("Programmatically navigate using React router").contains("Answer").click();
    cy.contains('Answer').click();
    cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type("joym");
    cy.get("#answerTextInput").type(answers[0]);
    cy.contains("Post Answer").click();
    cy.get(".answerText").each(($el, index) => {
      cy.contains(answers[index]);
    });
    cy.contains("joym");
    cy.contains("0 seconds ago");
  });

  it(" Username is mandatory when creating a new answer", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.contains("Answer").click();
    cy.contains("Answer Question").click();
    cy.get("#answerTextInput").type("Test Anser 1");
    cy.contains("Post Answer").click();
    cy.contains("Username cannot be empty");
  });

  it("Answer is mandatory when creating a new answer", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.contains("Answer").click();
    cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type("joym");
    cy.contains("Post Answer").click();
    cy.contains("Answer text cannot be empty");
  });

})