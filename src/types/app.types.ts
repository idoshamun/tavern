import type { Tables } from './utils.types';

export type Spell = Tables<'entities'> & { type: 'spells' } & Tables<'spells'>;
export type Condition = Tables<'entities'> & { type: 'conditions' };
export type Entity = Spell | Condition;

export type DbSpell = Tables<'entities'> & { type: 'spells'; spells: Tables<'spells'> };
export type DbCondition = Tables<'entities'> & { type: 'conditions' };
export type DbEntity = DbSpell | DbCondition;
