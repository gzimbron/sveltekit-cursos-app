// Actualiza la información de un curso mediante el formulario EditarCurso.

import { error, json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { nombre, descripcion, activo, imagenURL, cursoURL, id } = await request.json();

	if(nombre === "" || descripcion === "" || imagenURL === "" || cursoURL === ""){
		return new Response(JSON.stringify({error: 401, message: "No pueden haber campos vacíos."}))
	}
	const req = {
		endPoint: `cursos/${id}`,
		method: 'PUT',
		body: {
			data: {
				nombre: nombre,
				descripcion: descripcion,
				activo: activo,
				imagenURL: imagenURL,
				cursoURL: cursoURL
			}
		},
		headers: { 'Content-Type': 'application/json' }
	};

	try {
		let consulta = await apiFetch(req);
		return json(consulta);
	} catch {
		throw new Error('Error al actualizar la información del usuario.');
	}
}
