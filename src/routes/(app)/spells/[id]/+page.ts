import type { PageLoad } from './$types';
// import { supabase } from '$lib';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }: { params: { id: string } }) => {
	// const { data, error: supaError } = await supabase.from('spells').select('*').eq('id', params.id).limit(1);
	// if (supaError) {
	// 	throw supaError;
	// }
	// if (!data?.length) {
	// 	throw error(404, 'Not found');
	// }
	// return { title: data[0].name, spell: data[0] };
};
