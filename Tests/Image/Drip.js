const { Image } = require("../../Dist/Main");
const { writeFileSync } = require("fs");

const avatar = "https://cdn.discordapp.com/avatars/839367177899737108/2d6e6b95966c5ab9138698e5cb1fb298.png?size=2048";

Image.drip(avatar)
	.then(res => writeFileSync("drip.png", res));