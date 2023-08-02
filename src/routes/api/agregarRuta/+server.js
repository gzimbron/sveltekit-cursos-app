import { error } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const body = await request.json();
	const { data } = body;

	if (data.nombre === '') {
		return new Response(JSON.stringify({ code: 402, message: 'Debe ingresar un nombre.' }));
		//throw error(401, 'Debe ingresar un nombre.');
	}
	if (data.descripcion === '') {
		return new Response(JSON.stringify({ code: 402, message: 'Debe ingresar una descripción.' }));
		//throw error(402, 'Debe ingresar una descripción.');
	}
	if (data.cursos.connect.length == 0) {
		return new Response(JSON.stringify({ code: 402, message: 'Debe agregar cursos a la ruta.' }));
		//throw error(401, 'Debe agregar cursos a la ruta.');
	}

	const verificarRuta = await apiFetch({
		endPoint: `rutas?filters[nombre][$eq]=${data.nombre}`,
		method: 'GET'
	});

	if (verificarRuta.data.length) {
		return new Response(
			JSON.stringify({ code: 402, message: 'Ya existe una ruta con ese nombre.' })
		);
		//throw error(402, 'El correo ya está registrado.');
	}

	const req = {
		endPoint: 'rutas',
		method: 'POST',
		body: body
	};

	try {
		const result = await apiFetch(req);

		return new Response(JSON.stringify(result));
	} catch (e) {
		throw error(500, e?.message || 'Error desconocido');
	}
}
