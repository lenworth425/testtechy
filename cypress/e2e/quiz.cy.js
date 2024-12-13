
describe('Tech Quiz E2E Tests', () => {
    beforeEach(() => {
        cy.intercept({ 
            method:'GET', 
            url: '/api/questions/random'
            },
            {
            statusCode: 200,
            fixture: 'questions.json'
        }).as('getRandomQuestions');
        cy.visit('http://localhost:3001/');
    });
    

    it('should render start quiz button initially', () => {        
        cy.get('button').contains('Start Quiz').should('be.visible');
    });
    
    
    it('should start quiz and display the first question', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('.card h2').should('exist');
        cy.get('button').should('have.length.greaterThan', 0);
    });


    it('should answer a question correctly and move to the next question', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('.card h2').should('exist');
        cy.get('button').first().click();
    });
    
    it('should complete the quiz and show the score', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('button').first().click();
        cy.get('button').first().click();
        cy.get('.alert.alert-success').should('contain', 'Your score:');
    });

    it('should allow the user to retake the quiz', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('button').first().click();
        cy.get('button').first().click();
        cy.get('.alert.alert-success').should('contain', 'Your score:');
        cy.get('button').contains('Take New Quiz').click();
      });
});
   

