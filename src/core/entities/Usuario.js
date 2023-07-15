export default class Usuario {
	/**
	 *
	 * @param {{id: number,name: string,email: string,provider: string}} data
	 */
	constructor({ id, name, email, provider }) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.provider = provider;
	}
}