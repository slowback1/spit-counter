<script lang="ts">
	import { onMount } from 'svelte';
	import MessageBus from '$lib/bus/MessageBus';
	import UrlPathProvider, { RealUrlProvider } from '$lib/providers/urlPathProvider';
	import { Messages } from '$lib/bus/Messages';
	import ConfigService from '$lib/services/Config/ConfigService';
	import ToastWrapper from '$lib/ui/containers/toast/ToastWrapper.svelte';
	import FeatureFlagService from '$lib/services/FeatureFlag/FeatureFlagService';
	import ConfigFeatureFlagProvider from '$lib/services/FeatureFlag/ConfigFeatureFlagProvider';
	import LocalStorageProvider from '$lib/bus/providers/localStorageProvider';

	onMount(() => {
		MessageBus.initialize(new LocalStorageProvider());
		MessageBus.clear(Messages.SpitCounter);
		UrlPathProvider.initialize(new RealUrlProvider());
		ConfigService.initialize();
		FeatureFlagService.initialize(new ConfigFeatureFlagProvider());
	});
</script>

<svelte:head>
	<meta name="description" content="The Svelte Starter Kit!!!" />
</svelte:head>

<div class="dark-theme">
	<ToastWrapper />
	<main id="content" class="main-content">
		<slot />
	</main>
</div>

<style global>
	@import '../style/reset.css';
	@import '../style/globals.css';

	.main-content {
		height: 100vh;
		box-sizing: border-box;
		padding: var(--gutters-y) var(--gutters-x);
		display: flex;
		flex-direction: column;
	}
</style>
