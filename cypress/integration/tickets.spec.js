describe("Tickets", () =>{
    beforeEach(() => cy.visit("https://bit.ly/2XSuwCW"));

    it("fills all the text input fields", () => {
        const firstName = "Ana";
        const lastName = "Pedroso";
        
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("mail@mail.com");
        cy.get("#requests").type("Tenha comida");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });

    it("select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("select 'vip' ticket type", () =>{
        cy.get("#vip").check();
    });

    it("selects 'social media' checkbox", () => {
        cy.get("#social-media").check();
    });

    it("selects 'friend', and 'publication, then uncheck 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#publication").uncheck();
    });

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("alerts on invalid email", () => {
        cy.get("#email")
            .as("email")
            .type("bla-bla");
        
        cy.get("#email.invalid").should("exist");
        
        cy.get("@email")
            .clear()
            .type("bla@bla.com");

        cy.get("#email.invalid").should("not.exist");
    });

    it("fills and reset the form", ()=>{
        const firstName = "Ana";
        const lastName = "Pedroso";
        const fullName = `${firstName} ${lastName}`;
        const qtd_tickets = "1";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("ana.pedroso@mail.com");
        cy.get("#ticket-quantity").select(qtd_tickets);
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("Quero comida");
        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy ${qtd_tickets} VIP ticket`
        );
        cy.get("#agree").check();
        cy.get("#signature").type(fullName);
        cy.get("button[type='submit']").as("submitButton").should("not.be.disabled");
        cy.get(".reset").click();
        cy.get("button[type='submit']").as("submitButton").should("be.disabled");
    });

    it("fills mandatory fields ussing support command", ()=>{
        const customer = {
            firstName: "Zé",
            lastName: "Minerin",
            email: "zezins@mail.com"
        };

        cy.fillsMandatoryFields(customer);
        cy.get("button[type='submit']").as("submitButton").should("not.be.disabled");
        cy.get("#agree").click();
        cy.get("button[type='submit']").as("submitButton").should("be.disabled");
    });
});