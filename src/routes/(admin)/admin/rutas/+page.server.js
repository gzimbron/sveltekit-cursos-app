import { apiFetch } from '$core/functions/apiFetch';

/** @type {import("./$types").PageServerLoad} */
export async function load() {
	const response = await apiFetch({ endPoint: 'rutas', method: 'GET' });
	let data = response.data;

	/**  @type {import('$core/entities/Ruta').default[]} */
	const rutas = data.map((ruta) => ({
		id: ruta.id,
		name: ruta.attributes.nombre,
		descripcion: ruta.attributes.descripcion,
		activo: ruta.attributes.activo
	}));

	return { rutas };
}
