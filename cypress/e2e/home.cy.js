describe('Homepage', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should load the homepage', () => {
        cy.get('[data-cy="home-page"]').should('exist');
    });

    it('should display the homepage title', () => {
        cy.get('[data-cy="home-title"]')
            .should('exist')
            .and('contain.text', 'Welcome to Recipe Manager');
    });

    it('should display the homepage description', () => {
        cy.get('[data-cy="home-description"]')
            .should('exist')
            .and('contain.text', 'Create, view, edit, rate, and organize your favorite recipes with ease.');
    });

    it('should have Add Recipe button', () => {
        cy.get('[data-cy="add-recipe-btn"]').should('exist');
    });

    it('should have View Recipes button', () => {
        cy.get('[data-cy="view-recipes-btn"]').should('exist');
    });

    it('should navigate to Add Recipe page when Add Recipe button is clicked', () => {
        cy.get('[data-cy="add-recipe-btn"]').click();
        cy.url().should('include', '/add');
    });

    it('should navigate to View Recipes page when View Recipes button is clicked', () => {
        cy.get('[data-cy="view-recipes-btn"]').click();
        cy.url().should('include', '/list');
    });

    it('should display the View Recipes button correctly', () => {
        cy.get('[data-cy="view-recipes-btn"]')
            .should('be.visible')
            .and('contain.text', 'View Recipes');
    });

    it('should navigate to View Recipes page and display recipe list', () => {
        cy.get('[data-cy="view-recipes-btn"]').click();
        cy.url().should('include', '/list');
        cy.get('[data-cy="recipe-list"]').should('exist');
    });

    it('should contain Add Recipe and View Recipes buttons on page load', () => {
        cy.get('[data-cy="add-recipe-btn"]').should('be.visible');
        cy.get('[data-cy="view-recipes-btn"]').should('be.visible');
    });

    it('should display home page elements correctly', () => {
        cy.get('[data-cy="home-page"]').should('exist');
        cy.get('[data-cy="home-title"]').should('contain.text', 'Welcome to Recipe Manager');
        cy.get('[data-cy="home-description"]').should('contain.text', 'Create, view, edit, rate, and organize your favorite recipes with ease.');
    });
});