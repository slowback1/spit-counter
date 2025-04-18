import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { CounterDSL } from '../dsl/counterDSL';

const counterDSL = CounterDSL.getInstance();

Given('I can see the counter', () => {
	counterDSL.visitCounterPage();
	counterDSL.resetCounter();
});

Then('I see the counter is {int}', (expectedCount: number) => {
	let actualValue = counterDSL.getCounterValue();
	expect(actualValue).to.equal(expectedCount);
});

When('I click the increment button', () => {
	counterDSL.clickIncrementButton();
}); 