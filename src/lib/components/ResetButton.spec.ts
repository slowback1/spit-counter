import { render, fireEvent } from '@testing-library/svelte';
import ResetButton from '$lib/components/ResetButton.svelte';
import MessageBus from '$lib/bus/MessageBus';
import { Messages } from '$lib/bus/Messages';
import { vi } from 'vitest';

describe('ResetButton', () => {
	beforeEach(() => {
		// Reset the message bus state
		MessageBus.clear(Messages.SpitCounter);
	});

	it('should render a button with "Reset" text', () => {
		const { getByText } = render(ResetButton);
		expect(getByText('Reset')).toBeInTheDocument();
	});

	it('should send a reset message to the message bus when clicked', async () => {
		const { getByText } = render(ResetButton);
		const button = getByText('Reset');

		// Set up a spy on the message bus
		const sendMessageSpy = vi.spyOn(MessageBus, 'sendMessage');

		// Click the button
		await fireEvent.click(button);

		// Verify the message was sent with the correct parameters
		expect(sendMessageSpy).toHaveBeenCalledWith(Messages.SpitCounter, 0);
	});
}); 