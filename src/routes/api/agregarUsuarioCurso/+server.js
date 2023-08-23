// Crea un nuevo elemento usuario-curso con la ID del usuario al que se le asignará y el ID del curso.

import { json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const body = await request.json();

	const jsonrequest = {
		data: {
			idUsuario: body.idUsuario,
			terminado: false,
			curso: {
				connect: [body.idCurso]
			}
		}
	};

	let req = {
		endPoint: 'usuario-cursos',
		method: 'POST',
		body: jsonrequest
	};

	try{
		let result = await apiFetch(req);
		
		const id = result.data.id;
		result = await apiFetch({
			endPoint: `usuario-cursos/${id}?populate=*`,
			method: 'GET'
		});
		return json(result);
	}
	catch{
		throw new Error('Error al asignar el curso.');
	}

	

}
