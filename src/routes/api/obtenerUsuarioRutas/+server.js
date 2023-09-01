// Obtiene un ID de un usuario para buscarlo en la BD y retornar las rutas que tenga asignadas.

import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const idUsuario = await request.json();

	try{
        let data = await apiFetch({
            endPoint: `usuario-rutas?filters[idUsuario][$eq]=${idUsuario}&populate=*`,
            method: 'GET'
        })
		data = data.data;
		return new Response(JSON.stringify(data));
	}
	catch{
		throw new Error('Error al obtener la información del curso.');
	}

}