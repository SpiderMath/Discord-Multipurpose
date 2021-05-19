export default function shorten(text: string, len: number) {
	if (typeof text !== "string") return "";
	if (text.length <= len) return text;
	return text.substr(0, len).trim() + "...";
};