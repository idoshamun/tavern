<script>
	import '../app.css';

	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { page } from '$app/stores';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	$: title = $page?.data?.title ? `${$page.data.title} | ${PUBLIC_APP_NAME}` : PUBLIC_APP_NAME;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Your D&D companion" />
</svelte:head>
<slot />
