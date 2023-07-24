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

	const req = {
		endPoint: 'usuario-cursos',
		method: 'POST',
		body: jsonrequest
	};

	const result = await apiFetch(req);

	return json(result);
}
