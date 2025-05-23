import type IStorageProvider from './providers/IStorageProvider';

type SubscriberCallback<T = any> = (value?: T) => void | Promise<void>;

class MessageBusConfiguration {
	private noStorageMessages: { [key: string]: boolean } = {};

	doNotStoreDataForMessage(message: string) {
		this.noStorageMessages[message] = true;
	}

	restartStoringDataForMessage(message: string) {
		delete this.noStorageMessages[message];
	}

	shouldStoreDataForMessage(message: string) {
		const hasANoStorageMessage = this.noStorageMessages[message] ?? false;

		return !hasANoStorageMessage;
	}
}

export default class MessageBus {
	private static messageLog: { [message: string]: any } = {};
	private static subscribers: { [message: string]: SubscriberCallback[] } = {};
	private static storageProvider: IStorageProvider;
	public static configure: MessageBusConfiguration = new MessageBusConfiguration();

	public static initialize(storageProvider: IStorageProvider) {
		this.storageProvider = storageProvider;
		this.configure = new MessageBusConfiguration();

		const storedValues = storageProvider.getStore();

		Object.keys(storedValues).forEach((key) => {
			const value = this.tryParseJson(storedValues[key]);

			this.sendMessage(key, value);
		});
	}

	private static tryParseJson(value: string) {
		try {
			return JSON.parse(value);
		} catch {}
		return value;
	}

	public static subscribe<T = any>(message: string, callback: (value: T) => void): () => void {
		if (!this.subscribers[message]) this.subscribers[message] = [];

		this.subscribers[message].push(callback);

		callback(this.messageLog[message]);

		return () => {
			this.subscribers[message] = this.subscribers[message].filter((s) => s != callback);
		};
	}

	static sendMessage(message: string, value: any) {
		this.messageLog[message] = value;
		this.notifySubscribers(message);
		this.updateStorage(message);
	}

	static async sendMessageAsync(message: string, value: any) {
		this.messageLog[message] = value;
		await this.notifySubscribersAsync(message);
		this.updateStorage(message);
	}

	static clear(message: string) {
		this.sendMessage(message, null);
	}

	static clearAll() {
		const messages = Object.keys(this.messageLog);

		messages.forEach((message) => this.clear(message));
	}

	static getLastMessage<T = any>(message: string): T | null {
		return this.messageLog[message];
	}

	private static updateStorage(message: string) {
		if (!this.storageProvider) return;
		if (!this.configure.shouldStoreDataForMessage(message)) return;

		const value = this.messageLog[message];

		const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);

		this.storageProvider.setItem(message, valueToStore);
	}
	private static async notifySubscribersAsync(message: string) {
		const subscriberList = this.subscribers[message];
		const value = this.messageLog[message];

		if (subscriberList)
			for (const sub of subscriberList) {
				await sub(value);
			}
	}
	private static notifySubscribers(message: string) {
		const subscriberList = this.subscribers[message];
		const value = this.messageLog[message];

		if (subscriberList)
			subscriberList.forEach((sub) => {
				sub(value);
			});
	}
}
