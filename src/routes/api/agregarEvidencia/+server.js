import { error } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { id, url } = await request.json();

	const body = {
		data: {
			verificacion: url
		}
	};

	const req = {
		endPoint: `usuario-cursos/${id}`,
		method: 'PUT',
		body: body
	};

	try {
		const result = await apiFetch(req);
		return new Response(JSON.stringify(result));
	} catch {
		return new Response(
			JSON.stringify({ error: 401, message: 'Hubo un error al agregar la evidencia' })
		);
	}
}
