// Obtiene la URL de la imagen de verificación de un usuario-curso para mostrarla en pantalla.

import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const id = await request.json();
	const req = {
		endPoint: `usuario-cursos?filters[id][$eq]=${id}&fields=verificacion`,
		method: 'GET'
	};

	try {
		const result = await apiFetch(req);
		let data = result.data;
		return new Response(JSON.stringify(data));
	} catch {
		return new Response(
			JSON.stringify({ error: 401, message: 'Hubo un error al cargar la imagen' })
		);
	}
}
