describe("Cypress Tests repeated from React assignment", () => {

    beforeEach(() => {
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
      });
    
      afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });

it('Adds three questions and one answer, then click "Questions", then click unanswered button, verifies the sequence', () => {
    cy.visit("http://localhost:3000");

    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    // add a question
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question A");
    cy.get("#formTextInput").type("Test Question A Text");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("mks1");
    cy.contains("Post Question").click();

    // add another question
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question B");
    cy.get("#formTextInput").type("Test Question B Text");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("mks2");
    cy.contains("Post Question").click();

    // add another question
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question C");
    cy.get("#formTextInput").type("Test Question C Text");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("mks3");
    cy.contains("Post Question").click();

    // add an answer to question A
    cy.contains("Answer").click();
    cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type("abc3");
    cy.get("#answerTextInput").type("Answer Question A");
    cy.contains("Post Answer").click();

    // go back to main page
    cy.contains("Questions").click();

    // clicks unanswered
    cy.contains("Unanswered").click();
    const qTitles = ["Test Question B", "Test Question A"];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });
  });
  
  it("Adds multiple questions one by one and displays them in All Questions", () => {
    cy.visit("http://localhost:3000");

    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    // Add multiple questions
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question 1");
    cy.get("#formTextInput").type("Test Question 1 Text");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("joym");
    cy.contains("Post Question").click();

    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question 2");
    cy.get("#formTextInput").type("Test Question 2 Text");
    cy.get("#formTagInput").type("react");
    cy.get("#formUsernameInput").type("abhi");
    cy.contains("Post Question").click();

    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question 3");
    cy.get("#formTextInput").type("Test Question 3 Text");
    cy.get("#formTagInput").type("java");
    cy.get("#formUsernameInput").type("abhi");
    cy.contains("Post Question").click();

    // verify the presence of multiple questions in most recently added order.
    cy.contains("Fake Stack Overflow");
    const qTitles = [
      "Test Question 3",
      "Test Question 2",
      "Test Question 1",
      "Quick question about storage on android",
      "Object storage for a web application",
      "android studio save string shared preference, start activity and load the saved string",
      "Programmatically navigate using React router",
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitles[index]);
    });

    // verify that when clicking "Unanswered", the unanswered questions are shown
    cy.contains("Unanswered").click();
    const qTitlesUnanswered = [
      "Test Question 3",
      "Test Question 2",
      "Test Question 1",
    ];
    cy.get(".postTitle").each(($el, index, $list) => {
      cy.wrap($el).should("contain", qTitlesUnanswered[index]);
    });
  });

  it(" Ask a Question creates and displays expected meta data", () => {
    cy.visit("http://localhost:3000");

    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("Test Question Q1");
    cy.get("#formTextInput").type("Test Question Q1 Text T1");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("new user 32");
    cy.contains("Post Question").click();
    cy.contains("Fake Stack Overflow");
    cy.contains("5 questions");
    cy.contains("new user 32 asked 0 seconds ago");
    const answers = [
      "0 answers",
      "1 answers",
      "2 answers",
      "3 answers",
      "2 answers",
    ];
    const views = [
      "0 views",
      "103 views",
      "200 views",
      "121 views",
      "10 views",
    ];
    cy.get(".postStats").each(($el, index, $list) => {
      cy.wrap($el).should("contain", answers[index]);
      cy.wrap($el).should("contain", views[index]);
    });
    cy.contains("Unanswered").click();
    cy.get(".postTitle").should("have.length", 1);
    cy.contains("1 question");
  });

  it(" Ask a Question with empty title shows error", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.contains("Ask a Question").click();
    cy.get("#formTextInput").type("Test Question 1 Text Q1");
    cy.get("#formTagInput").type("javascript");
    cy.get("#formUsernameInput").type("new user 32");
    cy.contains("Post Question").click();
    cy.contains("Title cannot be empty");
  });

  it("Adds a question with a hyperlink and verifies", () => {
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type("How to add a hyperlink in Markdown?");
    cy.get("#formTextInput").type(
      "Here is a link: [Google](https://www.google.com)"
    );
    cy.get("#formTagInput").type("markdown");
    cy.get("#formUsernameInput").type("user1");
    cy.contains("Post Question").click();
    cy.contains("How to add a hyperlink in Markdown?");
    cy.contains("Answer").click()
    cy.get("#questionBody")
      .find("a")
      .should("have.attr", "href", "https://www.google.com"); 
  });

  it(" Create new answer should be displayed at the top of the answers page", () => {
    const answers = [
      "Check this link for more info: [Documentation](https://docs.example.com)",
      "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
      "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
    ];
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.contains("Answer").click();
    cy.contains("Answer Question").click();
    cy.get("#answerUsernameInput").type("joym");
    cy.get("#answerTextInput").type(
      "Check this link for more info: [Documentation](https://docs.example.com)"
    );
    cy.contains("Post Answer").click();
    cy.get(".answerText")
      .first()
      .within(() => {
        cy.get("a").should("have.attr", "href", "https://docs.example.com");
      });
    cy.contains("joym");
    cy.contains("0 seconds ago");
  });

  it("Tries to add a question with an invalid hyperlink and verifies failure", () => {
    const invalidUrls = [
      "[Google](htt://www.google.com)",
      "[Microsoft](microsoft.com)",
      "[](https://www.google.com/)",
      "[link]()",
      "dfv[]()",
      "[link](http://www.google.com/)",
      "[Google](https//www.google.com)",
      "[Google](htts://www.goo<gle.com)",
    ];
    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();
    cy.contains("Ask a Question").click();
    cy.get("#formTitleInput").type(
      "How to add an invalid hyperlink in Markdown?"
    );
    invalidUrls.forEach((url) => {
      cy.get("#formTextInput").clear().type(`This is an invalid link: ${url}`);
      cy.get("#formTagInput").clear().type("markdown");
      cy.get("#formUsernameInput").clear().type("user1");
      cy.contains("Post Question").click();
      cy.contains("Invalid hyperlink");
    });
    cy.visit("http://localhost:3000");
    cy.contains("How to add an invalid hyperlink in Markdown?").should(
      "not.exist"
    );
  });

  it("Adds questions with valid hyperlinks and verify", () => {

    // List of question data
    const questions = [
      {
        title: "Test Question 1",
        text: "Test Question 1 Text [Google](https://www.google.com)",
        tag: "javascript",
        username: "joym",
        link: "https://www.google.com",
      },
    ];

    cy.visit("http://localhost:3000");
    cy.get("#loginUsername").type("user1@example.com");
    cy.get("#loginPassword").type("password")
    cy.contains("Log In").click();

    // Add multiple questions with hyperlinks
    questions.forEach((question) => {
      cy.contains("Ask a Question").click();
      cy.get("#formTitleInput").type(question.title);
      cy.get("#formTextInput").type(question.text);
      cy.get("#formTagInput").type(question.tag);
      cy.get("#formUsernameInput").type(question.username);
      cy.contains("Post Question").click();
    });

    cy.contains("Questions").click();
    questions.reverse().forEach((q) => {
      cy.contains(q.title);
      cy.contains("Answer").click();
      cy.get("#questionBody")
        .find("a")
        .should("have.attr", "href", "https://www.google.com");
    });
  })

  })