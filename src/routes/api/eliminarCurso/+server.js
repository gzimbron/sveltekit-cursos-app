// Recibe el ID del curso a eliminar y envía la petición a la API para eliminarlo.

import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const id = await request.json();
	const req = {
		endPoint: `cursos/${id}`,
		method: 'DELETE'
	};

	try{
		const result = await apiFetch(req);
		return new Response(JSON.stringify(result));
	}
	catch{
		throw new Error('Error al eliminar el curso.');
	}

}
