<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Search from 'virtual:icons/jam/search';
	import Magic from 'virtual:icons/jam/magic';
	import { getEntityUrl } from '$lib/entities';
	import type { Tables } from '../../types/utils.types';
	import { supabase } from '$lib/supabase';
	import { groupBy } from '$lib/utils';

	const minQuery = 2;
	const icons: Record<string, SvelteComponent> = {
		spells: Magic
	};

	// Classes
	const cBase =
		'card bg-surface-100/60 dark:bg-surface-500/30 backdrop-blur-lg overflow-hidden w-full max-w-[800px] shadow-xl mt-8 mb-auto';
	const cHeader = 'bg-surface-300-600-token flex items-center';
	const cSearchInput = 'bg-transparent border-0 ring-0 focus:ring-0 w-full m-2 ml-4 text-lg';
	const cResults = 'overflow-x-auto max-h-[480px] hide-scrollbar';
	const cResultAnchor =
		'!rounded-none justify-between hover:variant-soft focus:!variant-filled-primary outline-0';
	const cFooter =
		'hidden md:flex items-center gap-2 bg-surface-300-600-token p-4 text-xs font-bold';

	let searchTerm = '';
	let results: Record<string, (Tables<'entities'> & { href: string })[]> = {};
	const modalStore = getModalStore();

	let elemDocSearch: HTMLElement;

	$: categories = Object.keys(results);

	async function search(query: string): Promise<(Tables<'entities'> & { href: string })[]> {
		const terms = query.trim().split(' ');
		terms[terms.length - 1] += ':*';
		const ftsQuery = terms.join(' & ');
		const { data, error } = await supabase
			.from('entities')
			.select('*')
			.textSearch('fts', ftsQuery)
			.limit(100);
		if (error) {
			console.error(error);
			return [];
		}
		return data.map((x) => ({ ...x, href: getEntityUrl(x) }));
	}

	async function onInput(): Promise<void> {
		if (searchTerm.length < minQuery) {
			results = {};
			return;
		}

		const rawResults = await search(searchTerm);
		results = groupBy(rawResults, 'type');
	}

	function onKeyDown(event: KeyboardEvent): void {
		if (['Enter', 'ArrowDown'].includes(event.code)) {
			const queryFirstAnchorElement = elemDocSearch.querySelector('a');
			if (queryFirstAnchorElement) queryFirstAnchorElement.focus();
		}
	}
</script>

<div bind:this={elemDocSearch} class="modal-search {cBase}">
	<!-- Header -->
	<header class="modal-search-header {cHeader}">
		<Search class="ml-4 text-xl" />
		<input
			class={cSearchInput}
			bind:value={searchTerm}
			type="search"
			placeholder="Search..."
			on:input={onInput}
			on:keydown={onKeyDown}
		/>
	</header>
	<!-- Results -->
	{#if categories.length > 0}
		<nav class="list-nav {cResults}" tabindex="-1">
			{#each categories as category}
				<div class="p-4 text-sm font-bold capitalize">
					{category}
				</div>
				<ul>
					{#each results[category] as entity}
						<li class="text-lg">
							<a
								class={cResultAnchor}
								href={entity.href}
								on:click={() => {
									modalStore.close();
								}}
							>
								<div class="flex items-center gap-4">
									<svelte:component this={icons[entity.type]} />
									<span class="flex-auto font-bold opacity-75">{entity.name}</span>
								</div>
								<span class="hidden text-xs opacity-50 md:block">{entity.href}</span>
							</a>
						</li>
					{/each}
				</ul>
			{/each}
		</nav>
	{:else}
		<div class="p-4">
			{#if searchTerm?.length >= minQuery}
				<p>No Results found for <code class="code">{searchTerm}</code>.</p>
			{:else}
				<p>Search for a spell, class, or other entity.</p>
			{/if}
		</div>
	{/if}
	<!-- Footer -->
	<footer class="modal-search-footer {cFooter}">
		<div><kbd class="kbd">Esc</kbd> to close</div>
		<div><kbd class="kbd">Tab</kbd> to navigate</div>
		<div><kbd class="kbd">Enter</kbd> to select</div>
	</footer>
</div>
