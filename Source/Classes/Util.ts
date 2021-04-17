export default class Util {
	static randomNumber(start: number = 0, end: number = 1) {
		if(isNaN(start)) throw new TypeError("Start is not a Number");
		if(isNaN(end)) throw new TypeError("End is not a Number");

		return start + Math.floor(Math.random() * (end - start + 1));
	}
};