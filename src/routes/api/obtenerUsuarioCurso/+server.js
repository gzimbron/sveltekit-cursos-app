// Obtiene un ID de un usuario-curso para buscarlo en la BD y retornar su información.

import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const id = await request.json();
	const req = {
		endPoint: `usuario-cursos?filters[id][$eq]=${id}`,
		method: 'GET'
	};

	try{
		const result = await apiFetch(req);
		let data = result.data;
		return new Response(JSON.stringify(data));
	}
	catch{
		throw new Error('Error al obtener la información del curso.');
	}

}
