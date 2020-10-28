describe("homepage test", () => {
	beforeEach(() => {
		cy.login();
	});
	it("can get all the challenges", () => {
		cy.server();
		cy.route("**/api/v1/challenges", "fixture:client/challenges.json");
		cy.visit("/");
	});
});
