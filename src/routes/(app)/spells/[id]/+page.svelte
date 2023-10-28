<script lang="ts">
	import EntityCard from '$lib/components/EntityCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<EntityCard entity={data.entity} />
