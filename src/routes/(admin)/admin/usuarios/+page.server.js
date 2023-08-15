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

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const nombre = formData.get('nombre');
		const email = formData.get('email');
		const provider = formData.get('provider');
		const adminform = formData.get('admin');

		const obj = {
			nombre: nombre,
			email: email,
			provider: provider
		};

		console.log(obj);

		const body = {
			data: {
				nombre: nombre,
				email: email,
				provider: provider,
				admin: adminform == 'on' ? true : false
			}
		};

		console.log(body);

		/*
		const req = {
			endPoint: `usuario-cursos/${id}`,
			method: 'PUT',
			body: body
		};*/
	}
};
