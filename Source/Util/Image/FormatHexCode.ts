export default function FormatHexCode(hex: string, alt = "#000000") {
	if (!hex || typeof hex !== "string") return alt || "#000000";
	hex = hex.replace("#", "");
	if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	if (hex.length !== 6) return alt || "#000000";

	return `#${hex}`;
};