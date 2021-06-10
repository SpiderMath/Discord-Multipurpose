import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { join } from "path";
import { loadImage } from "../Util/Image/LoadImage";

GlobalFonts.register(join(__dirname, "../../Assets/Fonts/WHITNEY_MEDIUM.otf"));

export default class Image {
	/**
	 * @param avatar The avatar of the user who will be appearing in the ping
	 */
	public static async ping(avatar: string | Buffer) {
		if(!avatar) throw new Error("avatar not provided");

		const image = await loadImage(avatar);
		const pongy = await loadImage(join(__dirname, "../../Assets/Images/ping.png"));
		const canvas = createCanvas(400, 400);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(pongy, 0, 0, canvas.width, canvas.height);

		return await canvas.png();
	}

	/**
	 * @param avatar The avatar of the user, whose colour you want to invert
	*/
	public static async invert(avatar: string | Buffer) {
		if(!avatar) throw new Error("avatar not provided");

		const image = await loadImage(avatar);

		const canvas = createCanvas(image.width, image.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

		const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < imgData.data.length; i += 4) {
			imgData.data[i] = 255 - imgData.data[i];
			imgData.data[i + 1] = 255 - imgData.data[i + 1];
			imgData.data[i + 2] = 255 - imgData.data[i + 2];
			imgData.data[i + 3] = 255;
		}

		ctx.putImageData(imgData, 0, 0);

		return await canvas.png();
	}

	/**
	 * @param avatar The image on which you want to apply the filter
	 */
	public static async sepia(avatar: string | Buffer) {
		if(!avatar) throw new Error("avatar not provided");

		const image = await loadImage(avatar);

		const canvas = createCanvas(image.width, image.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

		const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < imgData.data.length; i += 4) {
			imgData.data[i] = imgData.data[i] * 0.393 + imgData.data[i + 1] * 0.769 + imgData.data[i + 2] * 0.189;
			imgData.data[i + 1] = imgData.data[i] * 0.349 + imgData.data[i + 1] * 0.686 + imgData.data[i + 2] * 0.168;
			imgData.data[i + 2] = imgData.data[i] * 0.272 + imgData.data[i + 1] * 0.534 + imgData.data[i + 2] * 0.131;
		}

		ctx.putImageData(imgData, 0, 0);

		return await canvas.png();
	}

	/**
	 * @param avatar The image on which you want to apply the filter
	*/
	public static async greyscale(avatar: string | Buffer) {
		if(!avatar) throw new Error("avatar not provided");

		const image = await loadImage(avatar);

		const canvas = createCanvas(image.width, image.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

		const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < imgData.data.length; i += 4) {
			const brightness = 0.34 * imgData.data[i] + 0.5 * imgData.data[i + 1] + 0.16 * imgData.data[i + 2];
			imgData.data[i] = brightness;
			imgData.data[i + 1] = brightness;
			imgData.data[i + 2] = brightness;
		}

		ctx.putImageData(imgData, 0, 0);

		return await canvas.png();
	}

	/**
	 * @param avatar The image which you want to blur
	*/
	public static async blur(avatar: string | Buffer) {
		if(!avatar) throw new Error("avatar not provided");

		const image = await loadImage(avatar);
		const canvas = createCanvas(image.width, image.height);
		const ctx = canvas.getContext("2d");

		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(image, 0, 0, canvas.width / 4, canvas.height / 4);
		ctx.imageSmoothingEnabled = true;
		// @ts-ignore
		ctx.drawImage(canvas, 0, 0, canvas.width / 4, canvas.height / 4, 0, 0, canvas.width + 5, canvas.height + 5);

		return await canvas.png();
	}

	/**
	 * @param avatar The image which you want to be 'drip'ed
	 */
	public static async drip(avatar: string | Buffer) {
		if(!avatar) throw new Error("avatar not provided");

		const image = await loadImage(avatar);
		const base = await loadImage(join(__dirname, "../../Assets/Images/drip.jpg"));
		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(image, 350, 150, 205, 205);

		return await canvas.png();
	}
};