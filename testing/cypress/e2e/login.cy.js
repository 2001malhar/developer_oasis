describe("Cypress Tests for Login", () => {

    beforeEach(() => {
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
      });
    
      afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
      });    

it('0.1 | Login user after register ,', () => {
    cy.visit("http://localhost:3000");

    cy.contains("Register New User").click();
    cy.get("#formUsername").type("Malhar");
    cy.get("#formEmail").type("malhar1@gmail.com");
    cy.get("#formPassword").type("malhar")
    cy.contains("Register").click();

    cy.url().should('include', '');

    cy.get("#loginUsername").type("malhar1@gmail.com");
    cy.get("#loginPassword").type("malhar")
    cy.contains("Log In").click();

    cy.contains("Ask a Question").click();
  })

  it('0.1.1 | Login user after register and log out,', () => {
    cy.visit("http://localhost:3000");

    cy.contains("Register New User").click();
    cy.get("#formUsername").type("Malhar");
    cy.get("#formEmail").type("malhar1@gmail.com");
    cy.get("#formPassword").type("malhar")
    cy.contains("Register").click();

    cy.url().should('include', '');

    cy.get("#loginUsername").type("malhar1@gmail.com");
    cy.get("#loginPassword").type("malhar")
    cy.contains("Log In").click();

    cy.contains("Ask a Question").click();
    cy.contains("Sign Out").click()

    cy.contains("Login");
  })

  it('0.2 | Error in username of register ,', () => {
    cy.visit("http://localhost:3000");

    cy.contains("Register New User").click();
    cy.get("#formEmail").type("malhar@gmail.com");
    cy.get("#formPassword").type("malhar")
    cy.contains("Register").click();
    cy.contains("Username must contain at least one alphanumeric character");
  })

  it('0.3 | Error in  of register ,', () => {
    cy.visit("http://localhost:3000");

    cy.contains("Register New User").click();
    cy.get("#formUsername").type("Malhar");
    cy.get("#formEmail").type("malhar");
    cy.get("#formPassword").type("malhar")
    cy.contains("Register").click();
    cy.contains("Invalid email format");
  })

  it('0.4 | Error in  of register ,', () => {
    cy.visit("http://localhost:3000");

    cy.contains("Register New User").click();
    cy.get("#formUsername").type("Malhar");
    cy.get("#formEmail").type("malhar@gmail.com");
    cy.get("#formPassword").type("malhar")
    cy.contains("Register").click();
    cy.contains("Register New User").click();
    cy.get("#formUsername").type("Malhar");
    cy.get("#formEmail").type("malhar@gmail.com");
    cy.get("#formPassword").type("malhar")
    cy.contains("Register").click();
    cy.contains("Email already exists");
  })

  it('0.5 | Fail login due to email,', () => {
    cy.visit("http://localhost:3000");

    cy.contains("Register New User").click();
    cy.get("#formUsername").type("Malhar");
    cy.get("#formEmail").type("malhar@gmail.com");
    cy.get("#formPassword").type("malhar")
    cy.contains("Register").click();
    cy.get("#loginUsername").type("malhar1@gmail.com");
    cy.get("#loginPassword").type("malhar")
    cy.contains("Log In").click();
    cy.contains("User not found")
  
  })

  it('0.6 | Fail login due to credentials/,', () => {
    cy.visit("http://localhost:3000");

    cy.contains("Register New User").click();
    cy.get("#formUsername").type("Malhar");
    cy.get("#formEmail").type("malhar@gmail.com");
    cy.get("#formPassword").type("malhar")
    cy.contains("Register").click();
    cy.get("#loginUsername").type("malhar@gmail.com");
    cy.get("#loginPassword").type("malhar1")
    cy.contains("Log In").click();
    cy.contains("Invalid credentials")
  
  })

})