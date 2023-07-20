export default class Ruta {
	/**
	 *
	 * @param {{id: number,nombre: string,descripcion: string,activo: boolean }} data
	 */
	constructor({ id, nombre, descripcion, activo }) {
		this.id = id;
		this.name = nombre;
		this.descripcion = descripcion;
		this.activo = activo;
	}
}
