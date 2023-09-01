import { apiFetch } from '$core/functions/apiFetch';

/** @type {import("./$types").PageServerLoad} */
export async function load({ params }) {
	const { idUsuario } = params;
	let { data } = await apiFetch({
		endPoint: `usuarios/${idUsuario}`,
		method: 'GET'
	});

	const usuario = data;

	return { usuario };
}
