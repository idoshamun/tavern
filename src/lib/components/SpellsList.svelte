<script lang="ts">
	import { getEntityUrl } from '$lib/entities';
	import { groupBy } from '$lib/utils';
	import type { DbSpell } from '../../types/app.types';

	export let entities: DbSpell[];

	// group entities by level
	$: spellsByLevel = groupBy(entities || [], 'level');
	$: levels = Object.keys(spellsByLevel).sort((a, b) => Number(a) - Number(b));

	function getLevel(level: string): string {
		if (level === '0') {
			return 'Cantrip';
		}
		return `Level ${level}`;
	}
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each levels as level}
		<div>
			<h5 class="font-bold h5">{getLevel(level)}</h5>
			<ol class="mt-2 list">
				{#each spellsByLevel[level] as entity}
					<li>
						<a href={getEntityUrl(entity)}>{entity.name}</a>
					</li>
				{/each}
			</ol>
		</div>
	{/each}
</div>
