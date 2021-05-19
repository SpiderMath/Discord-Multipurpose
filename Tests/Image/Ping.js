const { writeFileSync } = require("fs");
const { Image } = require("../../Dist/Source/Main");

Image.ping("https://cdn.discordapp.com/avatars/730986148398366721/98e10aea31494791e37a4e0bd108da87.png?size=256")
	.then(Buffer => {
		writeFileSync("ping.png", Buffer);
	});