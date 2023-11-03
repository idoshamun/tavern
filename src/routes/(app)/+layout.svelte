<script lang="ts">
	import { AppShell, Modal } from '@skeletonlabs/skeleton';
	import type { ModalComponent } from '@skeletonlabs/skeleton';

	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';
	import Search from '$lib/components/Search.svelte';

	// Registered list of Components for Modals
	const modalComponentRegistry: Record<string, ModalComponent> = {
		modalSearch: { ref: Search }
	};
</script>

<Modal components={modalComponentRegistry} />
<AppShell slotSidebarLeft="w-44 p-2 border-r border-surface-500" slotPageContent="p-6">
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<svelte:fragment slot="sidebarLeft"><Sidebar /></svelte:fragment>
	<slot />
</AppShell>
