import { questions } from '../fixtures/questions.json';

describe('Tech Quiz E2E Tests', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions/random', {
            statusCode: 200,
            body: questions
        }).as('getQuestions');

      cy.visit('localhost:3001/'); 
    });

    it('should render start quiz button initially', () => {
        cy.visit('localhost:3001');
        
        cy.get('button').contains('Start Quiz').should('be.visible');
    });
  
    it('should start the quiz and display the first question', () => {
        cy.get('button')
            .contains('Start Quiz')
            .click();

        cy.wait('@getQuestions');

        cy.get('h2')
            .contains('What is the capital of France?')
            .should('be.visible');

        const expectedAnswers = ['London', 'Berlin', 'Paris', 'Madrid'];
        expectedAnswers.forEach(answer => {
            cy.contains('button', answer).should('be.visible');
        });
    });

    it('should display the first question', () => {
        cy.get('h2').contains('What is the capital of France?');
    }); 

    it('should display the first question answers', () => {
        cy.get('button').contains('London');
        cy.get('button').contains('Berlin');
        cy.get('button').contains('Paris');
        cy.get('button').contains('Madrid');
    }); 

    it('should display the next question when the next button is clicked', () => {
        cy.get('button').contains('Next Question').click();
        cy.get('h2').contains('Which planet is closest to the Sun?');
    });

    it('should display the next question answers', () => {
        cy.get('button').contains('Venus');
        cy.get('button').contains('Mercury');
        cy.get('button').contains('Earth');
        cy.get('button').contains('Mars');
    });
});
