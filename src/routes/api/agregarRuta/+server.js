import { error } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const body = await request.json();
	const {data} = body;

	if(data.name === ""){
		throw error(401, "Debe ingresar un nombre.")
	}
	if(data.descripcion === ""){
		throw error(402, "Debe ingresar una descripción.")
	}
	if(data.cursos.connect.length == 0){
		throw error(401, "Debe agregar cursos a la ruta.")
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
		throw error(500, e?.message || 'Error desconocido')
	} 
	
}
