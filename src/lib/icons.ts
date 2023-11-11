import type { SvelteComponent } from 'svelte';
import Spells from 'virtual:icons/solar/magic-stick-3-bold';
import Conditions from 'virtual:icons/solar/ghost-bold';
import Classes from 'virtual:icons/solar/crown-minimalistic-bold';
import Subclasses from 'virtual:icons/solar/crown-star-bold';
import Features from 'virtual:icons/solar/hand-stars-linear';

export const typeIcons: Record<string, SvelteComponent> = {
	spells: Spells,
	conditions: Conditions,
	classes: Classes,
	subclasses: Subclasses,
	features: Features
};
