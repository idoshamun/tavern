<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { DbEntity } from '../../../types/app.types';
	import type { PageData } from './$types';
	import SpellsList from '$lib/components/SpellsList.svelte';
	import EntitiesList from '$lib/components/EntitiesList.svelte';

	export let data: PageData;

	const comps: Record<Partial<DbEntity['type']>, SvelteComponent> = {
		spells: SpellsList
	};
</script>

<svelte:component this={comps[data.type] ?? EntitiesList} entities={data.entities} />
