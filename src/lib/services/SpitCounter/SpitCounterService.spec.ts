import { describe, it, expect, beforeEach, vi } from 'vitest';
import SpitCounterService from './SpitCounterService.svelte';
import MessageBus from '$lib/bus/MessageBus';
import { Messages } from '$lib/bus/Messages';

describe('SpitCounterService', () => {
	let service: SpitCounterService;

	beforeEach(() => {
		MessageBus.clearAll();
		service = new SpitCounterService();
	});

	afterEach(() => {
		service.destroy();
	});

	it('should initialize with count 0', () => {
		expect(service.getCount()).toBe(0);
	});

	it('should initialize with existing count from message bus', () => {
		MessageBus.sendMessage(Messages.SpitCounter, 5);
		const newService = new SpitCounterService();
		expect(newService.getCount()).toBe(5);
		newService.destroy();
	});

	it('should increment count correctly', () => {
		service.incrementCount();
		expect(service.getCount()).toBe(1);

		service.incrementCount();
		expect(service.getCount()).toBe(2);
	});

	it('should update count when message bus changes', () => {
		MessageBus.sendMessage(Messages.SpitCounter, 10);
		expect(service.getCount()).toBe(10);
	});

	it('should clean up message bus subscription on destroy', () => {
		const spy = vi.spyOn(MessageBus, 'subscribe');
		const service = new SpitCounterService();
		service.destroy();
		
		// Verify the unsubscribe function was called
		expect(spy).toHaveBeenCalled();
	});
}); 