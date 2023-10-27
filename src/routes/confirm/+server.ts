import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const urlParams = new URLSearchParams(url.search);
	const code = urlParams.get('code');
	if (!code) {
		throw redirect(307, '/signup');
	}
	const { error } = await locals.supabase.auth.exchangeCodeForSession(code);
	if (error) {
		console.error(error);
		throw redirect(307, '/signup');
	}
	throw redirect(307, '/');
};
