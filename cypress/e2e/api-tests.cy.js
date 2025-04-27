// cypress/e2e/api.cy.js

describe('API /recipes (absolute URLs)', () => {
    const api = 'http://localhost:3001'; // json-server URL

    it('GET /recipes returns all recipes', () => {
        cy.request('GET', `${api}/recipes`)
            .its('status').should('eq', 200);
    });

    it('full CRUD flow on a recipe', () => {
        const newRecipe = {
            title: 'Cypress CRUD Recipe',
            category: 'Dessert',
            ingredients: 'Flour, sugar, eggs',
            vegetarian: true,
            difficulty: 2,
            rating: 3,
        };

        // 1) CREATE
        cy.request('POST', `${api}/recipes`, newRecipe)
            .then(({
                status,
                body: created
            }) => {
                expect(status).to.eq(201);
                expect(created).to.include(newRecipe);

                const id = created.id;

                // 2) READ the one we just created
                cy.request('GET', `${api}/recipes/${id}`)
                    .then(({
                        status,
                        body
                    }) => {
                        expect(status).to.eq(200);
                        expect(body).to.include({
                            ...newRecipe,
                            id
                        });
                    });

                // 3) UPDATE
                const updated = {
                    ...newRecipe,
                    title: 'Cypress CRUD Recipe (Updated)',
                    rating: 5,
                };
                cy.request('PUT', `${api}/recipes/${id}`, updated)
                    .then(({
                        status,
                        body
                    }) => {
                        expect(status).to.eq(200);
                        expect(body).to.include(updated);
                    });

                // 4) DELETE
                cy.request('DELETE', `${api}/recipes/${id}`)
                    .its('status').should('eq', 200);

                // 5) VERIFY deletion
                cy.request({
                    method: 'GET',
                    url: `${api}/recipes/${id}`,
                    failOnStatusCode: false,
                }).its('status').should('eq', 404);
            });
    });

    it('GET /recipes/:id returns 404 for non-existent recipe', () => {
        cy.request({
            method: 'GET',
            url: `${api}/recipes/9999`, // None existing ID
            failOnStatusCode: false, 
        }).its('status').should('eq', 404);
    });

    it('PUT /recipes/:id returns 404 for non-existent recipe', () => {
        const updatedRecipe = {
            title: 'Updated Recipe'
        };
        cy.request({
            method: 'PUT',
            url: `${api}/recipes/9999`, // None existing ID
            body: updatedRecipe,
            failOnStatusCode: false,
        }).its('status').should('eq', 404);
    });

});