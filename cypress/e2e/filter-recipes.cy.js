describe('Recipe List → Filtering & Sorting', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();

        cy.intercept('GET', '**/recipes', {
            fixture: 'defaultRecipes.json',
        }).as('getRecipes');

        cy.visit('/list');
        cy.wait('@getRecipes');
        cy.wait('@getRecipes');

        cy.get('[data-cy="recipes-list"]').should('exist');
    });

    it('filters recipes by category', () => {

        cy.fixture('defaultRecipes.json').then((recipes) => {
            const expectedCount = recipes.filter(r => r.category === 'Main Course').length;

            cy.get('[data-cy="filter-category"] .MuiSelect-select').click();
            cy.get('li[role="option"]').contains('Main Course').click();

            cy.get('[data-cy="recipes-list"]')
                .children()
                .should('have.length', expectedCount);

            if (expectedCount > 0) {
                const firstTitle = recipes.find(r => r.category === 'Main Course').title;
                cy.get('[data-cy="recipes-list"]')
                    .children()
                    .first()
                    .find('[data-cy^="recipe-title-"]')
                    .should('contain', firstTitle);
            }
        });
    });

    it('filters recipes by vegetarian status', () => {
        cy.fixture('defaultRecipes.json').then((recipes) => {
            const expectedCount = recipes.filter(r => r.vegetarian).length;

            cy.get('[data-cy="filter-vegetarian"] .MuiSelect-select').click();
            cy.get('li[role="option"]').contains('Yes').click();

            cy.get('[data-cy="recipes-list"]')
                .children()
                .should('have.length', expectedCount);

            if (expectedCount > 0) {
                const firstTitle = recipes.filter(r => r.vegetarian)[0].title;
                cy.get('[data-cy="recipes-list"]')
                    .children()
                    .first()
                    .find('[data-cy^="recipe-title-"]')
                    .should('contain', firstTitle);
            }
        });
    });

    it('sorts recipes by difficulty (low → high)', () => {
        cy.fixture('defaultRecipes.json').then((recipes) => {

            const sorted = [...recipes].sort((a, b) => a.difficulty - b.difficulty);

            cy.get('[data-cy="sort-select"] .MuiSelect-select').click();
            cy.get('li[role="option"]').contains('Difficulty: Low to High').click();

            cy.get('[data-cy="recipes-list"]')
                .children()
                .should('have.length', sorted.length)
                .each((card, i) => {
                    cy.wrap(card)
                        .find('[data-cy^="recipe-title-"]')
                        .should('contain', sorted[i].title);
                });
        });
    });
});