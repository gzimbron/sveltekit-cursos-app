import { json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { data, id } = await request.json();

	const req = {
		endPoint: `rutas/${id}`,
		method: 'PUT',
		body: {
			data
		},
		headers: { 'Content-Type': 'application/json' }
	};

	console.log(req);

	try {
		let consulta = await apiFetch(req);
		return json(consulta);
	} catch {
		throw new Error('Error al actualizar la información del usuario.');
	}
}
