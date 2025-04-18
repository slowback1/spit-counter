import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { CounterDSL } from '../dsl/counterDSL';

const counterDSL = CounterDSL.getInstance();

Given('I can see the counter', () => {
	counterDSL.visitCounterPage();
	counterDSL.resetCounter();
});

Then('I see the counter is {int}', (expectedCount: number) => {
	counterDSL.assertCounterValue(expectedCount);
});

When('I click the increment button', () => {
	counterDSL.clickIncrementButton();
});

When('I reset the counter', () => {
	counterDSL.resetCounter();
}); 