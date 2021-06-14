export default function RandomElementFromArray(array: any[]) {
	return array[Math.floor(array.length * Math.random())];
};