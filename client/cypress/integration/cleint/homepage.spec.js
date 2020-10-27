descibe('homepage-test', () => {
    beforeEach(() => {
        cy.login();
    })
    it('can get all the challenges', () => {
        cy.visit('/')
    })
})