import { error, json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const id = await request.json();
	const req = {
		endPoint: `usuarios/${id}`,
		method: 'DELETE'
	};
	let result;

	try {
		result = await apiFetch(req);
		return json(result);
	} catch {
		throw error(500, 'Hubo un error en el servidor.');
	}
}
