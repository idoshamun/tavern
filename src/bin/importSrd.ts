import { readFile } from 'fs/promises';
import { join as joinPath } from 'path';
import type {
	The5ESRDClasses,
	The5ESRDFeatures,
	The5ESRDLevels,
	The5ESRDSpells,
	The5ESRDSubclasses
} from '../types/srd.types';
import type { Insert } from '../types/utils.types';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';
import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

type SrdEntity = { index: string; name: string; desc?: string[] };

const DATABASE_PATH = joinPath(__dirname, '..', '..', '..', '5e-database', 'src');

const supabase = createClient<Database>(
	publicEnv.PUBLIC_SUPABASE_URL,
	privateEnv.PRIVATE_SUPABASE_SERVICE_KEY
);

const mapArray = (arr?: { index: string }[] | null): string[] => arr?.map((x) => x.index) || [];

async function loadSrdFile<T>(name: string): Promise<T> {
	const path = joinPath(DATABASE_PATH, name);
	const content = await readFile(path, 'utf8');
	return JSON.parse(content);
}

async function loadEntities(entities: SrdEntity[], type: string): Promise<void> {
	const db = entities.map(
		(x): Insert<'entities'> => ({
			id: x.index,
			name: x.name,
			description: x.desc?.join('\n'),
			type
		})
	);
	console.log(`inserting ${db.length} entities`);
	const { error } = await supabase.from('entities').insert(db);
	if (error) {
		throw error;
	}
}

async function loadCustomEntities<T, Table extends keyof Database['public']['Tables']>(
	file: string,
	table: Table,
	mapFunc: (entity: T) => Insert<Table>
): Promise<void> {
	const srd = await loadSrdFile<T[]>(file);
	await loadEntities(srd, table);
	const db = srd.map(mapFunc);
	console.log(`inserting ${db.length} ${table}`);
	const { error } = await supabase.from(table).insert(db);
	if (error) {
		throw error;
	}
}

function loadSpells(): Promise<void> {
	return loadCustomEntities('5e-SRD-Spells.json', 'spells', (spell: The5ESRDSpells) => ({
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
		classes: mapArray(spell.classes),
		subclasses: mapArray(spell.subclasses)
	}));
}

async function loadConditions(): Promise<void> {
	const srd = await loadSrdFile<SrdEntity[]>('5e-SRD-Conditions.json');
	await loadEntities(srd, 'conditions');
}

function loadClasses(): Promise<void> {
	return loadCustomEntities('5e-SRD-Classes.json', 'classes', (cls: The5ESRDClasses) => ({
		id: cls.index,
		hit_die: cls.hit_die,
		proficiencies: mapArray(cls.proficiencies),
		saving_throws: mapArray(cls.saving_throws),
		spellcasting_ability: cls.spellcasting?.spellcasting_ability?.index || null,
		subclasses: mapArray(cls.subclasses)
	}));
}

async function loadSubclasses(): Promise<void> {
	return loadCustomEntities('5e-SRD-Subclasses.json', 'subclasses', (sub: The5ESRDSubclasses) => ({
		id: sub.index,
		class: sub.class.index,
		subclass_flavor: sub.subclass_flavor
	}));
}

async function loadFeatures(): Promise<void> {
	return loadCustomEntities('5e-SRD-Features.json', 'features', (feat: The5ESRDFeatures) => ({
		id: feat.index,
		class: feat.class.index,
		subclass: feat.subclass?.index || null,
		feature_specific: feat.feature_specific || null,
		level: feat.level,
		parent: feat.parent?.index || null,
		prerequisites:
			feat.prerequisites
				?.filter((x) => x.type !== 'level')
				.map((x) => ({
					type: x.type,
					id: (x.feature || x.spell).split('/').reverse()[0]
				})) || null
	}));
}

function mapSubclassSpells(sub: The5ESRDSubclasses): Insert<'subclass_spells'>[] {
	return (
		sub.spells?.map((spell) => ({
			subclass: sub.index,
			spell: spell.spell.index,
			level: parseInt(
				spell.prerequisites
					.find((x) => x.type === 'level')
					.index.split('-')
					.reverse()[0]
			),
			feature: spell.prerequisites.find((x) => x.type === 'feature')?.index || null
		})) || []
	);
}

async function loadSubclassSpells(): Promise<void> {
	const table = 'subclass_spells';
	const srd = await loadSrdFile<The5ESRDSubclasses[]>('5e-SRD-Subclasses.json');
	const db = srd.reduce(
		(acc, sub) => acc.concat(mapSubclassSpells(sub)),
		[] as Insert<'subclass_spells'>[]
	);
	console.log(`inserting ${db.length} ${table}`);
	const { error } = await supabase.from(table).insert(db);
	if (error) {
		throw error;
	}
}

async function loadLevels(): Promise<void> {
	const table = 'levels';
	const srd = await loadSrdFile<The5ESRDLevels[]>('5e-SRD-Levels.json');
	const db = srd.map(
		(lvl): Insert<'levels'> => ({
			id: lvl.index,
			level: lvl.level,
			class: lvl.class.index,
			subclass: lvl.subclass?.index || null,
			ability_score_bonuses: lvl.ability_score_bonuses || null,
			prof_bonus: lvl.prof_bonus || null,
			class_specific: lvl.class_specific || null,
			subclass_specific: lvl.subclass_specific || null,
			spells_known: lvl.spellcasting?.spells_known || null,
			cantrips_known: lvl.spellcasting?.cantrips_known || null,
			slot_level_1: lvl.spellcasting?.spell_slots_level_1 || null,
			slot_level_2: lvl.spellcasting?.spell_slots_level_2 || null,
			slot_level_3: lvl.spellcasting?.spell_slots_level_3 || null,
			slot_level_4: lvl.spellcasting?.spell_slots_level_4 || null,
			slot_level_5: lvl.spellcasting?.spell_slots_level_5 || null,
			slot_level_6: lvl.spellcasting?.spell_slots_level_6 || null,
			slot_level_7: lvl.spellcasting?.spell_slots_level_7 || null,
			slot_level_8: lvl.spellcasting?.spell_slots_level_8 || null,
			slot_level_9: lvl.spellcasting?.spell_slots_level_9 || null
		})
	);
	console.log(`inserting ${db.length} ${table}`);
	const { error } = await supabase.from(table).insert(db);
	if (error) {
		throw error;
	}
}

async function loadLevelsFeatures(): Promise<void> {
	const table = 'levels_features';
	const srd = await loadSrdFile<The5ESRDLevels[]>('5e-SRD-Levels.json');
	const db = srd.reduce((acc, lvl) => {
		return acc.concat(
			lvl.features?.map((feat) => ({ level: lvl.index, feature: feat.index })) || []
		);
	}, [] as Insert<'levels_features'>[]);
	console.log(`inserting ${db.length} ${table}`);
	const { error } = await supabase.from(table).insert(db);
	if (error) {
		throw error;
	}
}

async function main(): Promise<void> {
	await loadSpells();
	await loadConditions();
	await loadClasses();
	await loadSubclasses();
	await loadFeatures();
	await loadSubclassSpells();
	await loadLevels();
	await loadLevelsFeatures();
}

main()
	.then(() => process.exit())
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
