const { writeFileSync } = require("fs");
const { Image } = require("../../Dist/Source/Main");

Image.fakeReply("https://cdn.discordapp.com/avatars/730986148398366721/98e10aea31494791e37a4e0bd108da87.png?size=256", "https://cdn.discordapp.com/avatars/839367177899737108/a78a0def00e5c41d86a6708376aa3c7b.png?size=256", "Hi People, Hello World What am I doing why am I doing", "<:angy:841953130706108416>", "Aaryan", "SpiderBro", "FFF", "000", "dark")
	.then(Buffer => {
		writeFileSync("FakeReply-dark.png", Buffer);
	});