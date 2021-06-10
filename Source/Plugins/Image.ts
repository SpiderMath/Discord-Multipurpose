import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { join } from "path";
import Shorten from "../Util/Image/Shorten";
import FormatHexCode from "../Util/Image/FormatHexCode";
import GetDiscordTime from "../Util/Image/GetDiscordTime";
import { loadImage } from "../Util/Image/LoadImage";

GlobalFonts.register(join(__dirname, "../../Assets/Fonts/WHITNEY_MEDIUM.otf"));

export default class Image {
	/**
	 * @param avatar1 The avatar of the user who is replying
	 * @param avatar2 The avatar of the user being replied to
	 * @param username1 The nickname/username of the user who is replying
	 * @param username2 The nickname/username of the user who is being replied to
	 * @param messageText The content of the sent message
	 * @param replyText The content of the replied message
	 * @param hex1 The colour of the role of the replying user
	 * @param hex2 The colour of the role of the replying user
	 * @param mode The mode you want the stuff to be displayed in
	 * @default hex1 #ffffff
	 * @default hex2 #ffffff
	 * @default mode dark
	 */
	public static async fakeReply(avatar1: string | Buffer, avatar2: string | Buffer, replyText: string, messageText: string, username1: string, username2: string, hex1: string = "#FFFFFF", hex2: string = "#FFFFFF", mode: "light" | "dark" = "dark") {

		if (!avatar1) throw new Error("First avatar was not provided!");
		if (!avatar2) throw new Error("Second avatar was not provided!");
		if (!username1) throw new Error("First username was not provided!");
		if (!username2) throw new Error("Second username was not provided!");
		if (!messageText || typeof messageText !== "string") throw new Error("Main text was not provided!");
		if (!replyText || typeof replyText !== "string") throw new Error("Reply text was not provided!");
		if (!hex1 || typeof hex1 !== "string") hex1 = "#FFFFFF";
		if (!hex2 || typeof hex2 !== "string") hex2 = "#FFFFFF";
		if (!["light", "dark"].includes(mode.toLowerCase())) throw new Error("Invalid mode provided");
		// @ts-ignore
		mode = mode.toLowerCase();

		const image1 = await loadImage(avatar1);
		const image2 = await loadImage(avatar2);

		const canvas = createCanvas(1300, 250);
		const ctx = canvas.getContext("2d");

		if(mode === "dark") ctx.fillStyle = "#36393E";
		else ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if(mode === "dark") ctx.fillStyle = "#FFFFFF";
		else ctx.fillStyle = "#000000";
		ctx.textAlign = "left";

		ctx.font = "38px Whitney";

		ctx.font = "38px Whitney";
		ctx.fillStyle = FormatHexCode(hex1, "#FFFFFF");
		ctx.fillText(username1, 185, 147);

		const usernameWidth = ctx.measureText(username1).width;
		ctx.fillStyle = "#d1d1d1";
		ctx.fillText(" replied to ", 165 + usernameWidth + 20, 147);

		const repliedWidth = ctx.measureText(" replied to ").width;

		ctx.fillStyle = FormatHexCode(hex2, "#FFFFFF");
		ctx.font = "38px Whitney";
		ctx.fillText(username2, 165 + usernameWidth + repliedWidth + 20, 167 - 20);

		const secondMemberUserWidth = ctx.measureText(username2).width;

		ctx.font = "26px Whitney";
		ctx.fillStyle = "#7a7c80";
		const time = GetDiscordTime();

		ctx.fillText(` ${time}`, 165 + usernameWidth + repliedWidth + secondMemberUserWidth + 3 + 20, 167 - 20);

		ctx.font = "29px Whitney";
		ctx.globalAlpha = 0.7;
		ctx.fillStyle = "#d1d1d1";
		ctx.fillText(Shorten(replyText, 64), 195 + 20 + 20, 100 + 5 - 20);

		ctx.strokeStyle = "#a3a2a2";
		ctx.lineWidth = 4;
		ctx.globalAlpha = 0.4;
		ctx.moveTo(34 + (105 / 2) + 70 + 20, 92 + 5 - 20);
		ctx.lineTo(34 + (105 / 2) + 20, 92 + 5 - 20);

		ctx.moveTo(34 + (105 / 2) + 20, 92 + 5 - 20);
		ctx.quadraticCurveTo(34 + (105 / 2) + 4, 92 + 5 - 20, 34 + (105 / 2), 103 + 5 - 20);

		ctx.moveTo(34 + (105 / 2), 125 - 20);
		ctx.lineTo(34 + (105 / 2), 103 + 5 - 20);
		ctx.stroke();


		ctx.globalAlpha = 1;
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.arc(90, 182 - 20, 50, 0, Math.PI * 2, true);
		ctx.strokeStyle = "#36393E";
		ctx.stroke();
		ctx.closePath();

		ctx.clip();
		ctx.drawImage(image1, 38, 130 - 20, 105, 105);
		ctx.restore();

		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.arc(165 + 20 + 20, 90 + 5 - 20, 20, 0, Math.PI * 2);
		ctx.strokeStyle = "#36393E";
		ctx.stroke();
		ctx.closePath();

		ctx.clip();

		ctx.drawImage(image2, 165 + 20, 70 + 5 - 20, 40, 40);
		ctx.restore();

		return await canvas.png();
	}

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