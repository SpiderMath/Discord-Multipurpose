const { writeFileSync } = require("fs");
const { Image } = require("../../Dist/Main");
const avatar1 = "https://cdn.discordapp.com/avatars/548038495617417226/3f69790a6a782135950ed0b43af6a7c6.png?size=256";
const avatar2 = "https://cdn.discordapp.com/avatars/839367177899737108/a78a0def00e5c41d86a6708376aa3c7b.png?size=256";
const replyText = "1 + 1 = 10";
const text = "I totally agree 😁! It is completely valid mathematically!";
const author = "Conqueror.js";
const repliedUser = "SpiderBro";
const authorColor = "#ff00ff";
const repliedUserColour = "#00ff00";

Image.fakeReply(avatar1, avatar2, replyText, text, author, repliedUser, authorColor, repliedUserColour, "dark")
	.then(Buffer => {
		writeFileSync("FakeReply-dark.png", Buffer);
	});