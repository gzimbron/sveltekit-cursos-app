import { apiFetch } from '$core/functions/apiFetch';

/** @type {import("./$types").PageServerLoad} */
export async function load() {
	try {
		const response = await apiFetch({ endPoint: 'usuarios', method: 'GET' });
		let data = response.data;
		/**  @type {import('$core/entities/Usuario').default[]} */
		const usuarios = data.map((usuario) => ({
			id: usuario.id,
			name: usuario.attributes.nombre,
			email: usuario.attributes.email,
			provider: usuario.attributes.provider
		}));

		return { usuarios };
	} catch (e) {
		const error = { code: 404, message: 'Hubo un error al obtener los usuarios.' };
		return { error };
	}
}
