import MessageBus from '$lib/bus/MessageBus';
import { Messages } from '$lib/bus/Messages';

export default class SpitCounterService {
	private count = $state(MessageBus.getLastMessage<number>(Messages.SpitCounter) ?? 0);
	private unsubscribeFromBus: () => void;

	constructor() {
		// Subscribe to message bus changes
		this.unsubscribeFromBus = MessageBus.subscribe<number>(Messages.SpitCounter, (value) => {
			this.count = value ?? 0;
		});
	}

	public getCount(): number {
		return this.count;
	}

	public incrementCount(): void {
		MessageBus.sendMessage(Messages.SpitCounter, this.count + 1);
	}

	public destroy(): void {
		this.unsubscribeFromBus();
	}
} 