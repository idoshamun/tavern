import { readFile } from 'fs/promises';
import { join as joinPath } from 'path';
import type { The5ESRDSpells } from '../types/srd.types';
import type { Insert } from '../types/utils.types';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';
import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

const DATABASE_PATH = joinPath(__dirname, '..', '..', '..', '5e-database', 'src');

const supabase = createClient<Database>(
	publicEnv.PUBLIC_SUPABASE_URL,
	privateEnv.PRIVATE_SUPABASE_SERVICE_KEY
);

async function loadSrdFile<T>(name: string): Promise<T> {
	const path = joinPath(DATABASE_PATH, name);
	const content = await readFile(path, 'utf8');
	return JSON.parse(content);
}

async function loadEntities(
	entities: { index: string; name: string; desc: string[] }[],
	type: string
): Promise<void> {
	const db = entities.map(
		(x): Insert<'entities'> => ({
			id: x.index,
			name: x.name,
			description: x.desc.join('\n'),
			type
		})
	);
	console.log(`inserting ${db.length} entities`);
	const { error } = await supabase.from('entities').insert(db);
	if (error) {
		throw error;
	}
}

async function loadSpells(): Promise<void> {
	const srd = await loadSrdFile<The5ESRDSpells[]>('5e-SRD-Spells.json');
	await loadEntities(srd, 'spells');
	const db = srd.map(
		(spell): Insert<'spells'> => ({
			id: spell.index,
			higher_level: spell.higher_level || [],
			range: spell.range,
			components: spell.components,
			material: spell.material || null,
			is_ritual: spell.ritual,
			duration: spell.duration,
			is_concentration: spell.concentration,
			casting_time: spell.casting_time,
			level: spell.level,
			attack_type: spell.attack_type || null,
			damage_type: spell.damage?.damage_type?.index || null,
			damage_at_slot_level: spell.damage?.damage_at_slot_level || null,
			damage_at_character_level: spell.damage?.damage_at_character_level || null,
			school: spell.school.index,
			dc_type: spell.dc?.dc_type.index || null,
			dc_success: spell.dc?.dc_success || null,
			dc_description: spell.dc?.desc || null,
			heal_at_slot_level: spell.heal_at_slot_level || null,
			aoe_type: spell.area_of_effect?.type || null,
			aoe_size: spell.area_of_effect?.size || null,
			classes: spell.classes?.map((x) => x.index) || [],
			subclasses: spell.subclasses?.map((x) => x.index) || []
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
