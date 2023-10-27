<script>
	import '../app.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/sidebar.svelte';
	import Header from '$lib/components/header.svelte';
	import { page } from '$app/stores';
	import {env} from '$env/dynamic/public';

	let title = $page?.data?.title ? `${$page.data.title} | ${env.PUBLIC_APP_NAME}` : env.PUBLIC_APP_NAME;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Your D&D companion" />
</svelte:head>
<AppShell slotSidebarLeft="w-44 p-2 border-r border-surface-500" slotPageContent="p-6">
	<svelte:fragment slot="header"><Header/></svelte:fragment>
	<svelte:fragment slot="sidebarLeft"><Sidebar /></svelte:fragment>
	<slot />
</AppShell>
