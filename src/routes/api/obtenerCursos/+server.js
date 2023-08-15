import { json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const body = await request.json();
	const { idUsuario } = body;
	console.log(idUsuario);
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
