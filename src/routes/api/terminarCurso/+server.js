import { json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const id = await request.json();
	let result;
	const req = {
		endPoint: `usuario-cursos/${id}`,
		method: 'PUT',
		body: {
			data: {
				terminado: true
			}
		}
	};

	try {
		result = await apiFetch(req);
		return json(result);
	} catch {
		return json({ error: 401, message: 'Hubo un error al realizar la acción.' });
	}
}
