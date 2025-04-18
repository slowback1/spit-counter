<script lang="ts">
	import MessageBus from '$lib/bus/MessageBus';
	import { Messages } from '$lib/bus/Messages';

	function resetCounter() {
		MessageBus.sendMessage(Messages.SpitCounter, 0);
	}
</script>

<button class="reset-button" on:click={resetCounter}>
	Reset
</button>

<style>
	.reset-button {
		position: fixed;
		bottom: 20px;
		right: 20px;
		padding: 10px 20px;
		background-color: var(--color-base-red);
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: var(--font-size-small);
		transition: transform 0.1s ease;
	}

	.reset-button:hover {
		transform: scale(1.05);
	}

	.reset-button:active {
		transform: scale(0.95);
	}
</style> 