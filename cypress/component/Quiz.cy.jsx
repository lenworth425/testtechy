import React from 'react';
import Quiz from '../../client/src/components/Quiz';

const questions = [
    {
        "id": 1,
        "question": "What is the capital of France?",
        "answer": "Paris",
        "difficulty": "easy"
      },
      {
        "id": 2,
        "question": "Who wrote Romeo and Juliet?",
        "answer": "William Shakespeare",
        "difficulty": "medium"
      }

]   

describe('Quiz', () => {
    it('should render the quiz component', () => {
        cy.mount(<Quiz questions={questions} />)
    })

    it('renders a start button', () => {
        cy.mount(<Quiz questions={questions} />)
        cy.get('button').should('have.text', 'Start Quiz')
    })
    


})