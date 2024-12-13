import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.intercept({
        method: 'GET',
        url: '/api/questions/random'
      },
      {
        fixture: 'questions.json',
        statusCode: 200
      }
      ).as('getRandomQuestion')
    });

  it('should start the quiz and display the first question', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });

  it('should answer questions and complete the quiz', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card h2').should('exist');
    cy.get('button').first().click();  });

  it('should restart the quiz after completion', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card h2').should('exist');
    cy.get('button').first().click();
    cy.get('button').first().click();
    cy.get('.alert.alert-success').should('contain', 'Your score:');
    cy.get('button').contains('Take New Quiz').click();
  });
});
