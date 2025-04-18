<script lang="ts">
	import { onMount } from 'svelte';
	import SpitCounterService from '$lib/services/SpitCounter/SpitCounterService.svelte';
	import ResetButton from '$lib/components/ResetButton.svelte';
	import MessageBus from '$lib/bus/MessageBus';
	import { Messages } from '$lib/bus/Messages';

	const spitCounter = new SpitCounterService();
	let spitCount = $state(spitCounter.getCount());

	onMount(() => {
		// Subscribe to counter updates
		const unsubscribe = MessageBus.subscribe(Messages.SpitCounter, (count) => {
			spitCount = count ?? 0;
		});

		return () => {
			unsubscribe();
			spitCounter.destroy();
		};
	});

	function incrementCounter() {
		spitCounter.incrementCount();
		spitCount = spitCounter.getCount();
	}
</script>

<svelte:head>
	<title>Spit Counter</title>
</svelte:head>

<div class="container">
	<h1>Spit Counter: {spitCount}</h1>
	<button class="spit-button" on:click={incrementCounter}>
		Spit
	</button>
	<ResetButton />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 2rem;
		text-align: center;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
	}

	.spit-button {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background-color: #ff0000;
		color: white;
		font-size: 2rem;
		font-weight: bold;
		border: none;
		cursor: pointer;
		transition: transform 0.1s ease;
	}

	.spit-button:hover {
		transform: scale(1.05);
	}

	.spit-button:active {
		transform: scale(0.95);
	}
</style>
