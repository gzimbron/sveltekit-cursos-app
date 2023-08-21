// Actualiza la información de un usuario mediante el formulario EditarUsuario.

import { json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { nombre, email, provider, admin, id } = await request.json();

	const req = {
		endPoint: `usuarios/${id}`,
		method: 'PUT',
		body: {
			data: {
				nombre: nombre,
				email: email,
				provider: provider,
				admin: admin
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
