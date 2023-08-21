// Quita un curso de un usuario eliminando el elemento usuario-curso correspondiente mediante su ID.

// Falta manejo de error

import { json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const id = await request.json();
	const req = {
		endPoint: `usuario-cursos/${id}`,
		method: 'DELETE'
	};

	try{
		const result = await apiFetch(req);
		return new Response(JSON.stringify(result));
	}
	catch{
		throw new Error('Error al quitar el curso.');
	}

}
