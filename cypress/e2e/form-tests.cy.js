describe('Add Recipe Page', () => {
    beforeEach(() => {
        cy.visit('/add');
    });

    it('should display the recipe form with default values', () => {
        cy.get('[data-cy="recipe-form"]').should('exist');
        cy.get('[data-cy="difficulty-label"]').should('exist').and('contain.text', 'Intermediate');
    });

    it('should validate all required fields', () => {
        cy.get('[data-cy="recipe-form-submit"]').click();
        cy.get('[data-cy="recipe-form-success"]').should('not.exist');
    });

    it('should validate recipe title required field', () => {
        cy.get('[data-cy="recipe-form-ingredients"]').type('spaghetti, beef, tomato sauce');
        cy.get('[data-cy="recipe-form-vegetarian"]').click();
        cy.get('[data-cy="recipe-form-difficulty"] .MuiSlider-root').click('right', {
            force: true
        });

        cy.get('[data-cy="recipe-form-rating"]')
            .find('svg')
            .eq(3)
            .click({
                force: true
            });

        cy.get('[data-cy="recipe-form-submit"]').click();
        cy.get('[data-cy="recipe-form-success"]').should('not.exist');
    });

    it('should validate ingredients required field', () => {
        cy.get('[data-cy="recipe-form-title"]').type('Spaghetti Bolognese');
        cy.get('[data-cy="recipe-form-vegetarian"]').click();
        cy.get('[data-cy="recipe-form-difficulty"] .MuiSlider-root').click('right', {
            force: true
        });

        cy.get('[data-cy="recipe-form-rating"]')
            .find('svg')
            .eq(3)
            .click({
                force: true
            });

        cy.get('[data-cy="recipe-form-submit"]').click();
        cy.get('[data-cy="recipe-form-success"]').should('not.exist');
    });

    it('should validate rating required field', () => {
        cy.get('[data-cy="recipe-form-title"]').type('Spaghetti Bolognese');
        cy.get('[data-cy="recipe-form-ingredients"]').type('spaghetti, beef, tomato sauce');
        cy.get('[data-cy="recipe-form-vegetarian"]').click();
        cy.get('[data-cy="recipe-form-difficulty"] .MuiSlider-root').click('right', {
            force: true
        });

        cy.get('[data-cy="recipe-form-submit"]').click();
        cy.get('[data-cy="recipe-form-success"]').should('not.exist');
    });

    it('should successfully add a recipe', () => {
        cy.get('[data-cy="recipe-form-title"]').type('Spaghetti Bolognese');
        cy.get('[data-cy="recipe-form-ingredients"]').type('spaghetti, beef, tomato sauce');
        cy.get('[data-cy="recipe-form-vegetarian"]').click();

        cy.get('[data-cy="difficulty-label"]').should('contain.text', 'Intermediate');

        cy.get('[data-cy="recipe-form-difficulty"] .MuiSlider-root').click('right', {
            force: true
        });

        cy.get('[data-cy="difficulty-label"]').should('contain.text', 'Very Hard');

        cy.get('[data-cy="recipe-form-rating"]')
            .find('svg')
            .eq(3)
            .click({
                force: true
            });

        cy.get('[data-cy="recipe-form-submit"]').click();

        cy.get('[data-cy="recipe-form-success"]')
            .should('exist')
            .and('contain.text', 'Recipe successfully added!');
    });

    it('should update difficulty label when slider is moved', () => {
        cy.get('[data-cy="difficulty-label"]').should('contain.text', 'Intermediate');

        cy.get('[data-cy="recipe-form-difficulty"] .MuiSlider-root')
            .click('left', {
                force: true
            });

        cy.get('[data-cy="difficulty-label"]').should('contain.text', 'Very Easy');

        cy.get('[data-cy="recipe-form-difficulty"] .MuiSlider-root')
            .click('right', {
                force: true
            });

        cy.get('[data-cy="difficulty-label"]').should('contain.text', 'Very Hard');
    });
});