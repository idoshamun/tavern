import { error } from '@sveltejs/kit';
import { dbToEntity } from '$lib/entities';
import type { PageServerLoad } from './$types';
import type { DbEntity } from '$lib/types/app.types';
import type { SupabaseClient } from '@supabase/supabase-js';
import { humanizeId } from '../../../lib/entities';

const selectPerType: Record<Partial<DbEntity['type']>, string> = {
	spells: 'id, type, name, spells(level)'
};

async function loadEntities<T extends DbEntity>(
	client: SupabaseClient,
	entityType: T['type']
): Promise<T[]> {
	let query = client
		.from('entities')
		.select(selectPerType[entityType] ?? 'id, type, name')
		.eq('type', entityType);
	switch (entityType) {
		case 'spells':
			query = query.order('level', { foreignTable: 'spells' });
	}
	const { data, error: supaError } = await query.order('name');
	if (supaError) {
		throw supaError;
	}
	return data;
}

export const load: PageServerLoad = async ({ params, locals }) => {
	const data = await loadEntities(locals.supabase, params.type);
	if (!data?.length) {
		throw error(404, 'Not found');
	}
	return { title: humanizeId(params.type), entities: data.map(dbToEntity), type: params.type };
};
