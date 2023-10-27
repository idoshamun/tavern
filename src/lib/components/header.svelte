<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { PUBLIC_APP_NAME } from '$env/static/public';
</script>

<AppBar
	slotDefault="flex flex-row items-center"
	slotTrail="place-content-end"
	shadow="shadow-md"
	border="border-b border-surface-500"
	padding="py-2 px-4"
	background=""
>
	<img class="w-14" src="/android-chrome-192x192.png" alt="Logo" />
	<h3 class="ml-2 h3">{PUBLIC_APP_NAME}</h3>
	<svelte:fragment slot="trail"><LightSwitch class="self-end" /></svelte:fragment>
</AppBar>
