import { apiFetch } from '$core/functions/apiFetch';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('nombre');
		const descripcion = data.get('descripcion');
		const activo = data.get('estado');
		const imagenURL = data.get('imagenURL');
		const cursoURL = data.get('cursoURL');

		if (!name) {
			throw error(401, 'Debes ingresar un nombre.');
		}

		if (!descripcion) {
			throw error(401, 'Debes ingresar una descripción.');
		}

		if (!imagenURL) {
			throw error(401, 'Debes ingresar un enlace de imagen del curso.');
		}

		if (!cursoURL) {
			throw error(401, 'Debes agregar un enlace hacia el curso.');
		}

		//TODO: investigar como pasar un objeto a url params

		/* const filters = {
			email: { $eq : email}
		}; */

		const verificarUsuario = await apiFetch({
			endPoint: `cursos?filters[nombre][$eq]=${name}`,
			method: 'GET'
		});

		if (verificarUsuario.data.length) {
			throw error(402, 'Ya existe un curso con ese nombre.');
		}

		const json = {
			data: {
				nombre: name,
				descripcion: descripcion,
				activo: activo,
				imagenURL: imagenURL,
				cursoURL: cursoURL
			}
		};

		const req = {
			endPoint: 'cursos',
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
