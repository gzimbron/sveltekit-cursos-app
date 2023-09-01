// Quita una ruta de un usuario eliminando el elemento usuario-ruta correspondiente mediante su ID.

import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const id = await request.json();
	const req = {
		endPoint: `usuario-rutas/${id}`,
		method: 'DELETE'
	};

	try{
		const result = await apiFetch(req);
		return new Response(JSON.stringify(result));
	}
	catch{
		throw new Error('Error al quitar la ruta.');
	}

}
