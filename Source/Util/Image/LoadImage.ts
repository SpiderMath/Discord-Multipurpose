import { Image as SkImage } from "@napi-rs/canvas";
import { promises as fs, existsSync } from "fs";
import Axios from "axios";

/**
 * Utility function to load images
 * @param source Image source
 */
export async function loadImage(source: string | Buffer): Promise<SkImage> {
	if (typeof source === "string" && existsSync(source)) {
		const data = await fs.readFile(source);
		return createImage(data);
	}
	else if (typeof source === "string") {
		const res = await Axios.get(source);
		if (res.status !== 200) throw new Error(`Server responded with status ${res.status}`);
		return createImage(data);
	}
	else {
		return createImage(source);
	}
}

export function createImage(src: Buffer): SkImage {
	const imageConstructor = new SkImage();
	imageConstructor.src = src;

	return imageConstructor;
}