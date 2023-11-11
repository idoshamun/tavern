<script lang="ts">
	import { browser } from '$app/environment';
	import { AppBar, getModalStore } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Search from 'virtual:icons/jam/search';

	let isOsMac = false;
	const modalStore = getModalStore();

	// Set Search Keyboard Shortcut
	if (browser) {
		let os = navigator.userAgent;
		isOsMac = os.search('Mac') !== -1;
	}

	// Search
	function triggerSearch(): void {
		modalStore.trigger({
			type: 'component',
			component: 'modalSearch',
			position: 'item-start'
		});
	}

	// Keyboard Shortcut (CTRL/⌘+K) to Focus Search
	function onWindowKeydown(e: KeyboardEvent): void {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			// Prevent default browser behavior of focusing URL bar
			e.preventDefault();
			// If modal currently open, close modal (allows to open/close search with CTRL/⌘+K)
			$modalStore.length ? modalStore.close() : triggerSearch();
		}
	}
</script>

<svelte:window on:keydown|stopPropagation={onWindowKeydown} />

<AppBar
	slotDefault="flex flex-row place-content-center"
	shadow="shadow-md"
	border="border-b border-surface-500"
	padding="py-2 px-4"
	background=""
>
	<svelte:fragment slot="lead">
		<img class="w-14" src="/android-chrome-192x192.png" alt="Logo" />
		<h3 class="ml-2 h3">{PUBLIC_APP_NAME}</h3>
	</svelte:fragment>
	<!-- Search -->
	<button class="btn variant-soft hover:variant-soft-primary" on:click={triggerSearch}>
		<Search class="text-sm" />
		<span class="text-sm">Search</span>
		<small class="hidden md:inline-block">{isOsMac ? '⌘' : 'Ctrl'}+K</small>
	</button>
	<svelte:fragment slot="trail"><LightSwitch class="self-end" /></svelte:fragment>
</AppBar>
