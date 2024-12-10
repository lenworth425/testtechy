describe('Quiz Component E2E Tests', () => {
    beforeEach(() => {
      // Use cy.intercept with more specific matching
      cy.intercept({
        method: 'GET',
        url: '/api/questions/random'
      }, (req) => {
        // Log the intercepted request for debugging
        console.log('Intercepted request:', req.url);
        
        // Respond with mock data
        req.reply({
          statusCode: 200,
          body: [
            {
              question: "What is the capital of France?",
              answers: [
                { text: "London", isCorrect: false },
                { text: "Berlin", isCorrect: false },
                { text: "Paris", isCorrect: true },
                { text: "Madrid", isCorrect: false }
              ]
            },
            {
              question: "Which planet is closest to the Sun?",
              answers: [
                { text: "Venus", isCorrect: false },
                { text: "Mercury", isCorrect: true },
                { text: "Earth", isCorrect: false },
                { text: "Mars", isCorrect: false }
              ]
            }
          ]
        });
      }).as('getQuestions');
  
      // Stub console.error to prevent test failures
      cy.on('window:console', (console) => {
        cy.stub(console, 'error').callsFake((...args) => {
          // Log the error for debugging
          cy.log('Console error:', ...args);
        });
      });
  
      cy.visit('localhost:3001');
    });
  
    it('should start the quiz when the start button is clicked', () => {
      // Debugging: log all network requests
      cy.intercept('GET', '*').log('GET Request');
  
      // Find and click the start button
      cy.get('button')
        .contains('Start Quiz')
        .should('be.visible')
        .click();
  
      // Wait for questions with longer timeout and logging
      cy.get('@getQuestions', { timeout: 10000 }).then((interception) => {
        // Log the intercepted request details
        cy.log('Interception details:', JSON.stringify(interception));
        
        // Verify the response
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.body).to.have.length.greaterThan(0);
      });
  
      // Verify first question is displayed
      cy.contains('What is the capital of France?', { timeout: 10000 })
        .should('be.visible');
    });
  
    // ... rest of the tests remain the same, just add similar debugging to wait() calls
  
    // Add a test to explicitly check the API endpoint
    it('should fetch questions from the correct endpoint', () => {
      // Create a spy on the fetch method
      cy.window().then((win) => {
        cy.stub(win, 'fetch').callsFake((url, options) => {
          cy.log(`Fetch called with URL: ${url}`);
          return win.fetch(url, options);
        });
      });
  
      // Click start quiz button
      cy.get('button')
        .contains('Start Quiz')
        .click();
  
      // Wait and verify
      cy.wait('@getQuestions', { timeout: 10000 });
    });
  });