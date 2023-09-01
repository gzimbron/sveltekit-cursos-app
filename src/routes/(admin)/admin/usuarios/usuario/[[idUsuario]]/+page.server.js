import { apiFetch } from '$core/functions/apiFetch';

/** @type {import("./$types").PageServerLoad} */
export async function load({ params }) {
	const { idUsuario } = params;
	let { data } = await apiFetch({
		endPoint: `usuarios/${idUsuario}`,
		method: 'GET'
	});

	const usuario = data;

	data = await apiFetch({
		endPoint: `usuario-cursos?filters[idUsuario][$eq]=${idUsuario}&populate=*`,
		method: 'GET'
	});

	const usuarioCursos = data.data;

	data = await apiFetch({
		endPoint: `usuario-rutas?filters[idUsuario][$eq]=${idUsuario}&populate=*`,
		method: 'GET'
	})

	const usuarioRutas = data.data;

	return { usuario, usuarioCursos, usuarioRutas };
}
