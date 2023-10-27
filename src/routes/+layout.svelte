<script>
	import '../app.css';

	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { page } from '$app/stores';

	let title = $page?.data?.title ? `${$page.data.title} | ${PUBLIC_APP_NAME}` : PUBLIC_APP_NAME;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Your D&D companion" />
</svelte:head>
<slot />
