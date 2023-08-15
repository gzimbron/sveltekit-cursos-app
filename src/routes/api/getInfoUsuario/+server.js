import { json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { id } = await request.json();
	const req = {
		endPoint: `usuarios?filters[id][$eq]=${id}`,
		method: 'GET'
	};

	try {
		const result = await apiFetch(req);
		return new Response(JSON.stringify(result));
	} catch {
		throw new Error('Error al obtener la información del usuario.');
	}
}
