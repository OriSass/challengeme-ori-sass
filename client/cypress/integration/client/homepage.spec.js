describe('Home page test', () => {
    beforeEach(() => {
        cy.login();
    })
    it('can get all challenges', () => {
        cy.server();

        cy.route('**/api/v1/challenges', 'fixture')

        cy.visit('/');
    })
})