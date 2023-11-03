import type { Tables } from './utils.types';

export type Spell = Tables<'entities'> & { type: 'spells' } & Tables<'spells'>;
export type Entity = Spell;

export type DbSpell = Tables<'entities'> & { type: 'spells'; spells: Tables<'spells'> };
export type DbEntity = DbSpell;
