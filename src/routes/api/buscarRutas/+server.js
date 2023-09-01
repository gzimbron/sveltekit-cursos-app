// Recibe un string del elemento Buscador, consulta a la API por rutas cuyo nombre
// contenga esa string y las retorna.

import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { nombre } = await request.json();
	const req = {
		endPoint: `rutas?filters[nombre][$containsi]=${nombre}`,
		method: 'GET'
	};

	try{
		const result = await apiFetch(req);
		return new Response(JSON.stringify(result));
	}
	catch{
		throw new Error('Error al obtener los cursos.');
	}

}