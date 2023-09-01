// Obtiene los elementos usuario-curso asignados a un usuario.

import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const body = await request.json();
	const { idUsuario } = body;
	const req = {
		endPoint: `usuario-cursos?filters[idUsuario][$eq]=${idUsuario}&populate=*`,
		method: 'GET'
	};

	try {
		const result = await apiFetch(req);
		let data = result.data;

		return new Response(JSON.stringify(data));
	} catch {
		throw new Error('Error al obtener los cursos.');
	}
}
