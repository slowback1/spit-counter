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

		// Add keyboard event listener
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.code === 'Space') {
				event.preventDefault(); // Prevent page scroll
				incrementCounter();
			} else if (event.key.toLowerCase() === 'r') {
				MessageBus.sendMessage(Messages.SpitCounter, 0);
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			unsubscribe();
			window.removeEventListener('keydown', handleKeyPress);
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
	<div class="instructions">
		<p>Press <kbd>Space</kbd> to spit</p>
		<p>Press <kbd>R</kbd> to reset</p>
	</div>
	<h1>Spit Counter: {spitCount}</h1>
	<button class="spit-button" on:click={incrementCounter} aria-label="Spit">
		<svg viewBox="0 0 100 100" class="baseball">
			<defs>
				<clipPath id="ball-clip">
					<circle cx="50" cy="50" r="45"/>
				</clipPath>
			</defs>
			
			<!-- Baseball body -->
			<circle cx="50" cy="50" r="45" fill="#f5f5f5" stroke="#8B4513" stroke-width="1"/>
			
			<!-- Curved stitching pattern -->
			<g clip-path="url(#ball-clip)">
				<path d="M50 5 
					C 70 5, 70 20, 70 20
					C 70 30, 60 40, 50 40
					C 40 40, 30 30, 30 20
					C 30 20, 30 5, 50 5" 
					stroke="#8B4513" 
					stroke-width="2.5" 
					fill="none"
					stroke-dasharray="8,8"/>
				
				<path d="M50 60 
					C 60 60, 70 70, 70 80
					C 70 80, 70 95, 50 95
					C 30 95, 30 80, 30 80
					C 30 70, 40 60, 50 60" 
					stroke="#8B4513" 
					stroke-width="2.5" 
					fill="none"
					stroke-dasharray="8,8"/>
				
				<path d="M5 50 
					C 5 30, 20 30, 20 30
					C 30 30, 40 40, 40 50
					C 40 60, 30 70, 20 70
					C 20 70, 5 70, 5 50" 
					stroke="#8B4513" 
					stroke-width="2.5" 
					fill="none"
					stroke-dasharray="8,8"/>
				
				<path d="M60 50 
					C 60 40, 70 30, 80 30
					C 80 30, 95 30, 95 50
					C 95 70, 80 70, 80 70
					C 70 70, 60 60, 60 50" 
					stroke="#8B4513" 
					stroke-width="2.5" 
					fill="none"
					stroke-dasharray="8,8"/>
			</g>
			
			<!-- Stitching details -->
			<circle cx="50" cy="50" r="45" 
				stroke="#8B4513" 
				stroke-width="1" 
				fill="none"
				stroke-dasharray="1,3"/>

			<!-- Spit overlays -->
			<g clip-path="url(#ball-clip)">
				<!-- First spit -->
				{#if spitCount >= 1}
					<circle cx="60" cy="40" r="15" fill="rgba(173, 216, 230, 0.3)"/>
					<circle cx="65" cy="35" r="8" fill="rgba(173, 216, 230, 0.4)"/>
					<circle cx="70" cy="30" r="5" fill="rgba(173, 216, 230, 0.5)"/>
				{/if}

				<!-- Second spit -->
				{#if spitCount >= 2}
					<circle cx="40" cy="60" r="12" fill="rgba(173, 216, 230, 0.3)"/>
					<circle cx="45" cy="55" r="6" fill="rgba(173, 216, 230, 0.4)"/>
					<circle cx="50" cy="50" r="4" fill="rgba(173, 216, 230, 0.5)"/>
				{/if}

				<!-- Third spit -->
				{#if spitCount >= 3}
					<circle cx="70" cy="70" r="10" fill="rgba(173, 216, 230, 0.3)"/>
					<circle cx="75" cy="65" r="5" fill="rgba(173, 216, 230, 0.4)"/>
					<circle cx="80" cy="60" r="3" fill="rgba(173, 216, 230, 0.5)"/>
				{/if}

				<!-- Fourth spit -->
				{#if spitCount >= 4}
					<circle cx="30" cy="30" r="8" fill="rgba(173, 216, 230, 0.3)"/>
					<circle cx="35" cy="25" r="4" fill="rgba(173, 216, 230, 0.4)"/>
					<circle cx="40" cy="20" r="2" fill="rgba(173, 216, 230, 0.5)"/>
				{/if}

				<!-- Fifth spit -->
				{#if spitCount >= 5}
					<circle cx="50" cy="80" r="14" fill="rgba(173, 216, 230, 0.3)"/>
					<circle cx="55" cy="75" r="7" fill="rgba(173, 216, 230, 0.4)"/>
					<circle cx="60" cy="70" r="4" fill="rgba(173, 216, 230, 0.5)"/>
				{/if}

				<!-- Sixth spit -->
				{#if spitCount >= 6}
					<circle cx="20" cy="50" r="11" fill="rgba(173, 216, 230, 0.3)"/>
					<circle cx="25" cy="45" r="6" fill="rgba(173, 216, 230, 0.4)"/>
					<circle cx="30" cy="40" r="3" fill="rgba(173, 216, 230, 0.5)"/>
				{/if}

				<!-- Seventh spit -->
				{#if spitCount >= 7}
					<circle cx="80" cy="50" r="9" fill="rgba(173, 216, 230, 0.3)"/>
					<circle cx="85" cy="45" r="5" fill="rgba(173, 216, 230, 0.4)"/>
					<circle cx="90" cy="40" r="3" fill="rgba(173, 216, 230, 0.5)"/>
				{/if}

				<!-- Eighth spit -->
				{#if spitCount >= 8}
					<circle cx="50" cy="20" r="13" fill="rgba(173, 216, 230, 0.3)"/>
					<circle cx="55" cy="15" r="7" fill="rgba(173, 216, 230, 0.4)"/>
					<circle cx="60" cy="10" r="4" fill="rgba(173, 216, 230, 0.5)"/>
				{/if}

				<!-- Ninth spit -->
				{#if spitCount >= 9}
					<circle cx="35" cy="75" r="10" fill="rgba(173, 216, 230, 0.3)"/>
					<circle cx="40" cy="70" r="5" fill="rgba(173, 216, 230, 0.4)"/>
					<circle cx="45" cy="65" r="3" fill="rgba(173, 216, 230, 0.5)"/>
				{/if}

				<!-- Tenth spit -->
				{#if spitCount >= 10}
					<circle cx="65" cy="25" r="12" fill="rgba(173, 216, 230, 0.3)"/>
					<circle cx="70" cy="20" r="6" fill="rgba(173, 216, 230, 0.4)"/>
					<circle cx="75" cy="15" r="4" fill="rgba(173, 216, 230, 0.5)"/>
				{/if}
			</g>
		</svg>
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
		position: relative;
	}

	.instructions {
		position: absolute;
		top: 1rem;
		left: 1rem;
		text-align: left;
		font-size: 1rem;
		color: var(--color-font);
	}

	.instructions p {
		margin: 0.5em 0;
	}

	.instructions kbd {
		background-color: var(--color-background);
		border: 1px solid var(--color-font);
		border-radius: 3px;
		padding: 0.1em 0.4em;
		font-family: monospace;
		font-size: 0.9em;
		box-shadow: 0 1px 1px rgba(0,0,0,0.2);
		color: var(--color-font);
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
	}

	.spit-button {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background-color: transparent;
		border: none;
		cursor: pointer;
		transition: transform 0.1s ease;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.spit-button:hover {
		transform: scale(1.05);
	}

	.spit-button:active {
		transform: scale(0.95);
	}

	.baseball {
		width: 80%;
		height: 80%;
		filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
	}
</style>
