// Obtiene la ID de un curso y lo busca en la BD para retornar su información.

import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { id } = await request.json();
	const req = {
		endPoint: `cursos?filters[id][$eq]=${id}`,
		method: 'GET'
	};

	try {
		const result = await apiFetch(req);
		return new Response(JSON.stringify(result));
	} catch {
		throw new Error('Error al obtener la información del curso.');
	}
}
