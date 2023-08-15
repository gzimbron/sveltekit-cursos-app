import { goto } from '$app/navigation';
import { userStore } from '$core/stores/user.store';

export const getUserLogin = async () => {
	const token = sessionStorage.getItem('iduser');

	if (token !== null) {
		//  llamar logica para obtener datos del usuario

		let consulta = await fetch('/api/getInfoUsuario', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: token
			})
		});
		consulta = await consulta.json();
		consulta = consulta.data[0];

		const usuarioData = {
			id: consulta.id,
			nombre: consulta.attributes.nombre,
			email: consulta.attributes.email,
			provider: consulta.attributes.provider,
			admin: consulta.attributes.admin
		};

		userStore.set(usuarioData);
	} else {
		goto('/');
	}
};
