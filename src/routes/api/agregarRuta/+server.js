import { json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const body = await request.json();

	const req = {
		endPoint: 'rutas',
		method: 'POST',
		body: body
	};

	const result = await apiFetch(req);

	return new Response(JSON.stringify(result));
}
