<script lang="ts">
	import { generatePopups, generateTableRows, humanizeId } from '$lib/entities';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	import type { Entity } from '../../types/app.types';
	import Info from 'virtual:icons/jam/info';

	export let entity: Entity;

	$: rows = generateTableRows(entity);
	$: popups = generatePopups(entity);

	function getPopupSetting(name: string): PopupSettings {
		return {
			event: 'click',
			target: name,
			placement: 'top'
		};
	}
</script>

<div class="flex">
	<div class="overflow-hidden card bg-initial">
		<div class="p-4 space-y-2">
			<h6 class="h6">{humanizeId(entity.type)}</h6>
			<h3 class="h3">{entity.name}</h3>
			{#if entity.type === 'spells'}
				<div class="flex flex-row space-x-2">
					{#each entity.components as comp}
						<span class="chip variant-filled-secondary">{comp}</span>
					{/each}
					{#if entity.is_ritual}
						<span class="chip variant-filled-secondary">Ritual</span>
					{/if}
					{#if entity.is_concentration}
						<span class="chip variant-filled-secondary">Concentration</span>
					{/if}
				</div>
			{/if}
			<p class="whitespace-pre-line">{entity.description}</p>
			{#if entity.type === 'spells'}
				<div class="table-container">
					<table class="table">
						<tbody>
							{#each rows as row}
								<tr>
									<td class="font-bold">{row.name}</td>
									<td>{row.value} </td>
									<td>
										{#if row.popup}
											<button
												class="btn-icon btn-icon-sm !bg-transparent"
												use:popup={getPopupSetting(row.popup)}
											>
												<Info />
											</button>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	</div>
</div>

{#each popups as popup}
	<div
		class="z-10 max-w-md p-4 whitespace-pre-line card variant-filled-surface"
		data-popup={popup.name}
	>
		<p>{popup.content}</p>
		<div class="arrow variant-filled-surface" />
	</div>
{/each}

<style lang="postcss">
	.table tbody td {
		@apply p-2 align-middle;
	}
</style>
