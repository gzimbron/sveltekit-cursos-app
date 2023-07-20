export default class Curso {
	/**
	 *
	 * @param {{id: number,nombre: string,descripcion: string,activo: boolean,imagenURL: string,cursoURL: string }} data
	 */
	constructor({ id, nombre, descripcion, activo, imagenURL, cursoURL }) {
		this.id = id;
		this.name = nombre;
		this.descripcion = descripcion;
		this.activo = activo;
		this.imagenURL = imagenURL;
		this.cursoURL = cursoURL;
	}
}