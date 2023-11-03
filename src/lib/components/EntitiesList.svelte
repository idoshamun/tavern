<script lang="ts">
	import { getEntityUrl } from '$lib/entities';
	import type { DbEntity } from '../../types/app.types';

	export let entities: DbEntity[];
</script>

<div class="flex flex-col">
	<ol class="mt-2 list">
		{#each entities as entity}
			<li>
				<a href={getEntityUrl(entity)}>{entity.name}</a>
			</li>
		{/each}
	</ol>
</div>
