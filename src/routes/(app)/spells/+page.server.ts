import { dbToEntity } from '$lib/entities';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data, error: supaError } = await locals.supabase.from('entities').select('id, type, name, spells(level)').eq('type', 'spells').order('level', { foreignTable: 'spells' }).order('name');
	if (supaError) {
		throw supaError;
	}
	return { title: 'Spells', entities: data.map(dbToEntity) };
};
