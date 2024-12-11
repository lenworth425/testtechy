import { questionList } from '../fixtures/questions.json';
describe('Tech Quiz E2E Tests', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://127.0.0.1:3001/api/questions', {
            statusCode: 200,
            fixture: 'questions.json'
        }).as('questions');

      cy.visit('http://127.0.0.1:3001'); 
    });
    

    it('should render start quiz button initially', () => {        
        cy.get('button').contains('Start Quiz').should('be.visible');

        cy.intercept('GET', '**/questions', (req) => {
            console.log('Intercepted request:', req);
            req.reply({ fixture: 'questions.json' });
          });
    });
  
    it('should start quiz and display the first question', () => {
        cy.get('button').contains('Start Quiz').click();

        cy.intercept('GET', 'http://127.0.0.1:3001/api/questions/random', {
            statusCode: 200,
            fixture: 'questions.json'
        }).as('getQuestions');
        

        cy.get('.card h2').should('exist');

        cy.get('.btn.btn-primary').should('have.length.greaterThan', 0);
    });


    it('should answer a question correctly and move to the next question', () => {
        cy.get('button').contains('Start Quiz').click();
    
        cy.intercept('GET', 'http://127.0.0.1:3001/api/questions/random', {
            statusCode: 200,
            fixture: 'questions.json'
        }).as('getQuestions');
        

        cy.get('.card h2').should('exist');

        cy.get('.btn.btn-primary').first().click();
    });
    
    it('should complete the quiz and show the score', () => {
        cy.get('button').contains('Start Quiz').click();
        
        cy.intercept('GET', 'http://127.0.0.1:3001/api/questions', { 
            statusCode: 200,
            fixture: 'questions.json' 
        }).as('getQuestions');
    
        cy.get('.btn.btn-primary', { timeout: 10000 }).first().click();

        cy.get('.card h2').contains('Quiz Completed').should('exist');
        cy.get('.alert.alert-success').should('contain', 'Your score:');
    });

    it('should allow the user to retake the quiz', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.intercept('GET', 'http://127.0.0.1:3001/api/questions', { 
            statusCode: 200,
            fixture: 'questions.json' 
        }).as('getQuestions');
    
        cy.get('.btn.btn-primary').first().click();
    
        cy.get('.btn.btn-primary').each(($btn) => {
          cy.wrap($btn).click();
        });
    
        cy.get('button').contains('Take New Quiz').click();
    
        cy.get('button').contains('Start Quiz').should('exist');
      });
});
   