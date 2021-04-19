import Axios from "axios";

export default class Animal {
	/**
	 * Gives a random duck image URL
	*/
	public async duck() {
		const { data } = await Axios.get("https://random-d.uk/api/random");

		return data.url;
	}
}