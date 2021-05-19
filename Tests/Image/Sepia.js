const { writeFileSync } = require("fs");
const { Image } = require("../../Dist/Source/Main");
const avatar = "https://cdn.discordapp.com/avatars/839367177899737108/a78a0def00e5c41d86a6708376aa3c7b.png?size=256";

Image.sepia(avatar)
	.then(buffer => writeFileSync("Sepia.png", buffer));