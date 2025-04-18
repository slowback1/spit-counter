import { DSL } from './dsl';

export class CounterDSL extends DSL {
	private static instance: CounterDSL;

	private constructor() {
		super();
	}

	public static getInstance(): CounterDSL {
		if (!CounterDSL.instance) {
			CounterDSL.instance = new CounterDSL();
		}
		return CounterDSL.instance;
	}

	public visitCounterPage(): void {
		this.visitPage('/');
	}

	public getCounterValue(): number {
		const counterText = this.getElement('h1').invoke('text');
		return parseInt(counterText.toString().split(': ')[1]);
	}

	public clickIncrementButton(): void {
		this.clickElement('.spit-button');
	}

	public resetCounter(): void {
		this.visitPage('/');
		cy.window().then((win) => {
			win.location.reload();
		});
	}

	public assertCounterValue(expectedCount: number): void {
		this.assertText('h1', `Spit Counter: ${expectedCount}`);
	}
} 