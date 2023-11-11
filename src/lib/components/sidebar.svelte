<script lang="ts">
	import { page } from '$app/stores';

	const items = [
		{ name: 'Home', href: '/' },
		{ name: 'Spells', href: '/spells' },
		{ name: 'Conditions', href: '/conditions' }
	];

	$: classesActive = (href: string) => (href === $page.url.pathname ? 'variant-soft-primary' : '');
</script>

<nav class="list-nav">
	<ul>
		{#each items as item}
			<li>
				<a href={item.href} class={classesActive(item.href)}>{item.name}</a>
			</li>
		{/each}
	</ul>
</nav>
