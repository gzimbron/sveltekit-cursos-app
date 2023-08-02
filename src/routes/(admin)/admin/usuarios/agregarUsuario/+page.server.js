import { apiFetch } from '$core/functions/apiFetch';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('nombre');
		const email = data.get('email');
		const provider = data.get('provider');
		const password = data.get('password');

		if (!name) {
			throw error(401, 'Debes ingresar un nombre.');
		}

		if (!email) {
			throw error(401, 'Debes ingresar un email.');
		}

		if (!password) {
			throw error(401, 'Debes ingresar una contraseña.');
		}

		if (!provider) {
			throw error(401, 'Debes agregar un  provider');
		}

		//TODO: investigar como pasar un objeto a url params

		/* const filters = {
				email: { $eq : email}
			}; */

		const verificarUsuario = await apiFetch({
			endPoint: `usuarios?filters[email][$eq]=${email}`,
			method: 'GET'
		});

		if (verificarUsuario.data.length) {
			throw error(402, 'El correo ya está registrado.');
		}

		const json = {
			data: {
				nombre: name,
				email: email,
				provider: provider,
				password: password,
				role: 1
			}
		};

		const req = {
			endPoint: 'usuarios',
			method: 'POST',
			body: json
		};

		try {
			const { data } = await apiFetch(req);

			return { id: data.id };
		} catch (e) {
			throw error(500, e?.message || 'Error desconocido');
		}
	}
};
