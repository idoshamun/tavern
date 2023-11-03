import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { dbToEntity } from '$lib/entities';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { data, error: supaError } = await locals.supabase
		.from('entities')
		.select('*, spells(*)')
		.eq('id', params.id)
		.eq('type', 'spells')
		.single();
	if (supaError && supaError.code != 'PGRST116') {
		throw supaError;
	}
	if (!data) {
		throw error(404, 'Not found');
	}
	const entity = dbToEntity(data);
	return { title: entity.name, entity };
};
