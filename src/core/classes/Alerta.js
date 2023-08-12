import Swal from 'sweetalert2';

const swalProps = {
	confirmButtonColor: 'green',
	cancelButtonColor: 'red'
};

export default class Alerta {
	/**
	 * Lanza una alerta de error
	 * @param {string} error Mensaje del error
	 * @param {import('sweetalert2').SweetAlertOptions} options Opciones de SweetAlert2
	 * @returns
	 */
	static async error(error, options = {}) {
		return Swal.fire({
			...swalProps,
			text: error,
			icon: 'error',
			...options
		});
	}

	/**
	 * Lanza una alerta de información
	 * @param {string} text Mensaje del alert
	 * @param {import('sweetalert2').SweetAlertOptions} options Opciones de SweetAlert2
	 * @returns
	 */
	static async info(text, options = {}) {
		return Swal.fire({
			...swalProps,
			text,
			icon: 'info',
			...options
		});
	}

	/**
	 * Lanza una alerta de confirmación
	 * @param {string} text Mensaje del alert
	 * @param {import('sweetalert2').SweetAlertOptions} options Opciones de SweetAlert2
	 * @returns
	 */
	static async success(text, options = {}) {
		return Swal.fire({
			...swalProps,
			text,
			icon: 'success',
			...options
		});
	}

	/**
	 * Lanza una alerta de pregunta
	 * @param {string} text Mensaje del alert
	 * @param {import('sweetalert2').SweetAlertOptions} options Opciones de SweetAlert2
	 * @returns
	 */
	static async question(text, options = {}) {
		return Swal.fire({
			...swalProps,
			text,
			icon: 'question',
			confirmButtonText: 'Sí',
			showCancelButton: true,
			cancelButtonText: 'No',
			focusCancel: true,
			...options
		});
	}

	/**
	 * Lanza una alerta de advertencia
	 * @param {string} text Mensaje del alert
	 * @param {import('sweetalert2').SweetAlertOptions} options Opciones de SweetAlert2
	 * @returns
	 */
	static async warning(text, options = {}) {
		return Swal.fire({
			...swalProps,
			text,
			icon: 'warning',
			...options
		});
	}

	/**
	 * Lanza una alerta personalizada
	 * @param {string} text Mensaje del alert
	 * @param {import('sweetalert2').SweetAlertOptions} options Opciones de SweetAlert2
	 * @returns
	 */
	static async customQuestion(text, options = {}) {
		return Swal.fire({
			...swalProps,
			text,
			icon: 'warning',
			confirmButtonText: 'Sí',
			showCancelButton: true,
			cancelButtonText: 'No',
			focusCancel: true,
			...options
		});
	}
}
