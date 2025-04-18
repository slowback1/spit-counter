export abstract class DSL {
	protected constructor() {}

	protected getElement(selector: string): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(selector);
	}

	protected clickElement(selector: string): void {
		this.getElement(selector).click();
	}

	protected assertText(selector: string, expectedText: string): void {
		this.getElement(selector).should('contain', expectedText);
	}

	protected visitPage(path: string): void {
		cy.visit(path);
	}
}
