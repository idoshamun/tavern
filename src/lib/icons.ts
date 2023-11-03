import type { SvelteComponent } from 'svelte';
import Magic from 'virtual:icons/jam/magic';
import Ghost from 'virtual:icons/jam/ghost';

export const typeIcons: Record<string, SvelteComponent> = {
	spells: Magic,
	conditions: Ghost
};
