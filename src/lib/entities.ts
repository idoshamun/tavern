import type { Entity, Spell } from '../types/app.types';
import type { Tables } from '../types/utils.types';

export function humanizeId(id: string): string {
	return id
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function dbToEntity<
	EntityType extends Entity['type'],
	DbEntity extends Tables<'entities'> & { type: EntityType } & {
		[P in EntityType]: Tables<EntityType>;
	},
	TEntity extends Tables<'entities'> & { type: EntityType } & Tables<EntityType>
>(db: DbEntity): TEntity {
	const entity = { ...db, ...db[db.type] };
	delete entity[db.type];
	return entity as unknown as TEntity;
}

function getFirstValue(obj: Record<string, string>): string {
	const keys = Object.keys(obj).sort((a, b) => Number(a) - Number(b));
	return obj[keys[0]];
}

type Row = { name: string; value: string; popup?: string };
export function generateTableRows(entity: Entity): Row[] {
	const rows: Row[] = [];
	if (entity.type === 'spells') {
		rows.push({ name: 'Level', value: entity.level.toString() });
		rows.push({ name: 'Casting', value: entity.casting_time });
		rows.push({ name: 'Duration', value: entity.duration });
		if (entity.heal_at_slot_level) {
			const die = getFirstValue(entity.heal_at_slot_level as Record<string, string>);
			rows.push({ name: 'Heal', value: die, popup: 'higherLevel' });
		}
		if (entity.damage_type) {
			const die = entity.damage_at_character_level
				? getFirstValue(entity.damage_at_character_level as Record<string, string>)
				: getFirstValue(entity.damage_at_slot_level as Record<string, string>);
			rows.push({
				name: 'Damage',
				value: `${die} ${humanizeId(entity.damage_type)}`,
				popup: 'higherLevel'
			});
		}
		if (entity.aoe_type && entity.aoe_size) {
			let size = `${entity.aoe_size}-foot`;
			if (entity.aoe_type === 'sphere') {
				size += '-radius';
			}
			rows.push({ name: 'AOE', value: `${size} ${humanizeId(entity.aoe_type)}` });
		}
		if (entity.dc_type && entity.dc_success) {
			rows.push({ name: 'DC', value: humanizeId(entity.dc_type) });
			rows.push({ name: 'On success', value: humanizeId(entity.dc_success) });
		}
		if (entity.range) {
			rows.push({ name: 'Range', value: entity.range });
		}
		if (entity.material) {
			rows.push({ name: 'Material', value: entity.material });
		}
		rows.push({ name: 'School', value: humanizeId(entity.school) });
	}
	return rows;
}

type Popup = { name: string; content: string };

function spellHigherLevelPopup(entity: Spell): Popup | undefined {
	const name = 'higherLevel';
	if (entity.higher_level?.length) {
		return { name, content: entity.higher_level.join('\n') };
	}
	const obj = (entity.damage_at_character_level ||
		entity.damage_at_slot_level ||
		entity.heal_at_slot_level) as Record<string, string>;
	if (obj) {
		const isChar = !!entity.damage_at_character_level;
		const isHeal = !!entity.heal_at_slot_level;
		const keys = Object.keys(obj).sort((a, b) => Number(a) - Number(b));
		const content = keys.map((x) => `Level ${x}: ${obj[x]}`).join('\n');
		const title = `${isHeal ? 'Heal' : 'Damage'} at ${isChar ? 'character' : 'slot'} level`;
		return { name, content: `${title}\n${content}` };
	}
}

export function generatePopups(entity: Entity): Popup[] {
	const popups: Popup[] = [];
	if (entity.type == 'spells') {
		const higherLevel = spellHigherLevelPopup(entity);
		if (higherLevel) popups.push(higherLevel);
	}
	return popups;
}

export function getEntityUrl(entity: Pick<Tables<'entities'>, 'type' | 'id'>): string {
	return `/${entity.type}/${entity.id}`;
}
