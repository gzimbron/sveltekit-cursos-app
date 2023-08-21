// Reibe el ID de la ruta a eliminar y envía la petición a la API para eliminarla.

// Falta manejo de error

import { json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const id = await request.json();
	const req = {
		endPoint: `rutas/${id}`,
		method: 'DELETE'
	};

	const result = await apiFetch(req);

	return json(result);
}
