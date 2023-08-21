// Obtiene un ID de una ruta y lo busca en la BD para retornar su información.

import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { id } = await request.json();
	const req = {
		endPoint: `rutas?filters[id][$eq]=${id}&populate=*`,
		method: 'GET'
	};

	try {
		const result = await apiFetch(req);
		return new Response(JSON.stringify(result));
	} catch {
		throw new Error('Error al obtener la información de la ruta.');
	}
}
