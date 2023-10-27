import type { Actions } from './$types';
import { PUBLIC_URL } from '$env/static/public';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (session) {
		throw redirect(307, '/');
	}
	return;
};

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const { data, error } = await event.locals.supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${PUBLIC_URL}/confirm`
			}
		});
		if (error) {
			console.error(error);
			return fail(400, { message: error.toString() });
		}
		console.log(data);
		return { success: true };
	}
} satisfies Actions;
