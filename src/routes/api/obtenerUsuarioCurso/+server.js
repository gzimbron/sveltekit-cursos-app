import { json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const id = await request.json();
	const req = {
		endPoint: `usuario-cursos?filters[id][$eq]=${id}`,
		method: 'GET'
	};

	const result = await apiFetch(req);
	let data = result.data;

	return new Response(JSON.stringify(data));
}
