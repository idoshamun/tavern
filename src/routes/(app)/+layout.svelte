<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/sidebar.svelte';
	import Header from '$lib/components/header.svelte';
</script>

<AppShell slotSidebarLeft="w-44 p-2 border-r border-surface-500" slotPageContent="p-6">
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<svelte:fragment slot="sidebarLeft"><Sidebar /></svelte:fragment>
	<slot />
</AppShell>
