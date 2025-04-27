describe('Recipe List → Detail Navigation Flow', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3001/recipes', {
            fixture: 'defaultRecipes.json',
        }).as('getRecipes');

        cy.visit('/list');

        cy.wait('@getRecipes');

        cy.get('[data-cy="recipes-list"]').should('exist');
    });

    it('should open the detail page upon clicking the first recipe and validate displayed information', () => {
        // Ensure detail section is initially not visible
        cy.get('[data-cy="recipe-detail-rating"]').should('not.exist');

        // Click on the first recipe card
        cy.get('[data-cy="recipe-card-0"]').click();

        // Validate the URL
        cy.url().should('match', /\/detail\/0$/);

        // Verify recipe details
        cy.get('h4').should('contain.text', 'Spaghetti Bolognese');
        cy.get('.MuiChip-root').should('contain.text', 'Main Course');

        cy.contains('Ingredients: Spaghetti, ground beef, tomato sauce, onion, garlic').should('exist');
        cy.contains('Vegetarian: No').should('exist');
        cy.contains('Difficulty: Intermediate').should('exist');

        // Validate rating
        cy.get('[data-cy="recipe-detail-rating"]').within(() => {
            cy.get('.MuiRating-root')
                .find('.MuiRating-iconFilled')
                .should('have.length', 6); // precision = 0.5
        });

        // Confirm the rating stars are read-only
        cy.get('[data-cy="recipe-rating-stars"]')
            .should('have.class', 'Mui-readOnly');

        // Ensure "Back to list" button is visible and functional
        cy.contains('button', 'Back to list').should('be.visible').click();

        // Verify navigation back to the list
        cy.url().should('include', '/list');
    });
});