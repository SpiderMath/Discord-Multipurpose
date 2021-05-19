"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
const path_1 = require("path");
const emoji_parser_1 = require("@canvacord/emoji-parser");
const Shorten_1 = __importDefault(require("../Util/Image/Shorten"));
const FormatHexCode_1 = __importDefault(require("../Util/Image/FormatHexCode"));
const GetDiscordTime_1 = __importDefault(require("../Util/Image/GetDiscordTime"));
canvas_1.registerFont(path_1.join(__dirname, "../../../Assets/Fonts/WHITNEY_MEDIUM.otf"), {
    family: "Whitney",
    weight: "regular",
    style: "Normal",
});
class Image {
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
    static async fakeReply(avatar1, avatar2, replyText, messageText, username1, username2, hex1 = "#FFFFFF", hex2 = "#FFFFFF", mode = "dark") {
        if (!avatar1)
            throw new Error("First avatar was not provided!");
        if (!avatar2)
            throw new Error("Second avatar was not provided!");
        if (!username1)
            throw new Error("First username was not provided!");
        if (!username2)
            throw new Error("Second username was not provided!");
        if (!messageText || typeof messageText !== "string")
            throw new Error("Main text was not provided!");
        if (!replyText || typeof replyText !== "string")
            throw new Error("Reply text was not provided!");
        if (!hex1 || typeof hex1 !== "string")
            hex1 = "#FFFFFF";
        if (!hex2 || typeof hex2 !== "string")
            hex2 = "#FFFFFF";
        if (!["light", "dark"].includes(mode.toLowerCase()))
            throw new Error("Invalid mode provided");
        // @ts-ignore
        mode = mode.toLowerCase();
        const image1 = await canvas_1.loadImage(avatar1);
        const image2 = await canvas_1.loadImage(avatar2);
        const canvas = canvas_1.createCanvas(1300, 250);
        const ctx = canvas.getContext("2d");
        if (mode === "dark")
            ctx.fillStyle = "#36393E";
        else
            ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (mode === "dark")
            ctx.fillStyle = "#FFFFFF";
        else
            ctx.fillStyle = "#000000";
        ctx.textAlign = "left";
        ctx.font = "38px Whitney";
        await emoji_parser_1.fillTextWithTwemoji(ctx, Shorten_1.default(messageText, 64), 186, 200);
        ctx.font = "38px Whitney";
        ctx.fillStyle = FormatHexCode_1.default(hex1, "#FFFFFF");
        ctx.fillText(username1, 185, 147);
        const usernameWidth = ctx.measureText(username1).width;
        ctx.fillStyle = "#d1d1d1";
        ctx.fillText(" replied to ", 165 + usernameWidth + 20, 147);
        const repliedWidth = ctx.measureText(" replied to ").width;
        ctx.fillStyle = FormatHexCode_1.default(hex2, "#FFFFFF");
        ctx.font = "38px Whitney";
        ctx.fillText(username2, 165 + usernameWidth + repliedWidth + 20, 167 - 20);
        const secondMemberUserWidth = ctx.measureText(username2).width;
        ctx.font = "26px Whitney";
        ctx.fillStyle = "#7a7c80";
        const time = GetDiscordTime_1.default();
        ctx.fillText(` ${time}`, 165 + usernameWidth + repliedWidth + secondMemberUserWidth + 3 + 20, 167 - 20);
        ctx.font = "29px Whitney";
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = "#d1d1d1";
        ctx.fillText(Shorten_1.default(replyText, 64), 195 + 20 + 20, 100 + 5 - 20);
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
        return canvas.toBuffer();
    }
    /**
     * @param avatar The avatar of the user who will be appearing in the ping
     */
    static async ping(avatar) {
        if (!avatar)
            throw new Error("avatar not provided");
        const image = await canvas_1.loadImage(avatar);
        const pongy = await canvas_1.loadImage(path_1.join(__dirname, "../../../Assets/Images/ping.png"));
        const canvas = canvas_1.createCanvas(400, 400);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(pongy, 0, 0, canvas.width, canvas.height);
        return canvas.toBuffer();
    }
}
exports.default = Image;
;
//# sourceMappingURL=Image.js.map