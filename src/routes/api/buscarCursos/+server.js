// Recibe un string del elemento Buscador, consulta a la API por cursos cuyo nombre
// contenga esa string y los retorna.

import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { nombreCurso } = await request.json();
	const req = {
		endPoint: `cursos?filters[nombre][$containsi]=${nombreCurso}`,
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
