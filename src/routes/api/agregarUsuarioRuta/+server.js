// Crea un nuevo elemento usuario-ruta con la ID del usuario al que se le asignará y el ID de la ruta.
// Recibe idRuta y idBody

import { json } from '@sveltejs/kit';
import { apiFetch } from '$core/functions/apiFetch';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const body = await request.json();
	// Obtener los cursos de la ruta especificada

	try{
		let cursos = await apiFetch({
			endPoint: `rutas/${body.idRuta}?populate=*`,
			method: 'GET',
		})
		cursos = cursos.data.attributes.cursos.data;
		
		// Generar los usuario-curso correspondientes y almacenar sus IDs.
		const ids = await cursos.map(async curso => {

			const response = await apiFetch({
				endPoint: 'usuario-cursos',
				method: 'POST',
				body: {
					"data": {
						"idUsuario": body.idUsuario,
						"curso": {
							"connect": [curso.id]
						},
						"terminado": false
					}
				}
			})
			return response.data.id;
		
		})
		const idsArray = await Promise.all(ids);

		// Generar el usuario-ruta con los usuario-cursos generados
		let result = await apiFetch({
			endPoint: 'usuario-rutas',
			method: 'POST',
			body: {
				"data": {
					"idUsuario": body.idUsuario,
					"ruta": {
						"connect": [body.idRuta]
					},
					"usuario_cursos": {
						"connect": idsArray
					},
					"terminado": false
				}
			}
		})
		const id = result.data.id;
		result = await apiFetch({
			endPoint: `usuario-rutas/${id}?populate=*`,
			method: 'GET'
		});
		return json(result);
	}
	catch(e){
		throw new Error('Error al asignar la ruta.');
	}

}
