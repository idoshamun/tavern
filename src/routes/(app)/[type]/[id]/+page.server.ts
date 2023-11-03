import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { dbToEntity } from '$lib/entities';
import { SupabaseClient } from '@supabase/supabase-js';
import { DbEntity } from '../../../../types/app.types';

const selectPerType: Record<Partial<DbEntity['type']>, string> = {
	conditions: '*'
};

async function loadEntity<T extends DbEntity>(
	client: SupabaseClient,
	id: string,
	entityType: T['type']
): Promise<T[]> {
	const { data, error: supaError } = await client
		.from('entities')
		.select(selectPerType[entityType] ?? `*, ${entityType}(*)`)
		.eq('id', id)
		.eq('type', entityType)
		.single();
	if (supaError && supaError.code != 'PGRST116') {
		throw supaError;
	}
	return data;
}

export const load: PageServerLoad = async ({ params, locals }) => {
	const data = await loadEntity(locals.supabase, params.id, params.type);
	if (!data) {
		throw error(404, 'Not found');
	}
	const entity = dbToEntity(data);
	return { title: entity.name, entity };
};
