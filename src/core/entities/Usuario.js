export default class Usuario {
	/**
	 *
	 * @param {{id: number,nombre: string,email: string,proveedor: string,}} data
	 */
	constructor({ id, nombre, email, proveedor }) {
		this.id = id;
		this.nombre = nombre;
		this.email = email;
		this.proveedor = proveedor;
	}
}