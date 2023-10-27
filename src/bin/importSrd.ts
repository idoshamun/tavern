import { readFile } from 'fs/promises';
import { join as joinPath } from 'path';
import type { The5ESRDSpells } from '../types/srd.types';
import { supabase } from '../lib';
import type { Tables } from '../types/utils.types';

const DATABASE_PATH = joinPath(__dirname, '..', '..', '..', '5e-database', 'src');

async function loadSrdFile<T extends Record<string, unknown>>(name: string): Promise<T> {
	const path = joinPath(DATABASE_PATH, name);
	const content = await readFile(path, 'utf8');
	return JSON.parse(content);
}

async function loadSpells(): Promise<void> {
	const srd = await loadSrdFile<The5ESRDSpells[]>('5e-SRD-Spells.json');
	const db = srd.map(
		(spell): Tables<'spells'> => ({
			id: spell.index,
			name: spell.name,
			description: spell.desc.join('\n'),
			higher_level: spell.higher_level || [],
			range: spell.range,
			components: spell.components,
			material: spell.material,
			is_ritual: spell.ritual,
			duration: spell.duration,
			is_concentration: spell.concentration,
			casting_time: spell.casting_time,
			level: spell.level,
			attack_type: spell.attack_type,
			damage_type: spell.damage?.damage_type?.index,
			damage_at_slot_level: spell.damage?.damage_at_slot_level,
			damage_at_character_level: spell.damage?.damage_at_character_level,
			school: spell.school.index,
			dc_type: spell.dc?.dc_type.index,
			dc_success: spell.dc?.dc_success,
			dc_description: spell.dc?.desc,
			heal_at_slot_level: spell.heal_at_slot_level,
			aoe_type: spell.area_of_effect?.type,
			aoe_size: spell.area_of_effect?.size
		})
	);
	console.log(`inserting ${db.length} spells`);
	const { error } = await supabase.from('spells').insert(db);
	if (error) {
		throw error;
	}
}

async function main(): Promise<void> {
	await loadSpells();
}

main()
	.then(() => process.exit())
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
