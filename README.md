# **Discord Multipurpose**

This is a package to help make development of Discord.js bots easier. Also has Type Declarations!

# Installation
```sh
$npm i discord-multipurpose@latest
```

That should install the package to your project

# Modules & Usage

- #### Discord Emoji
```js
const Multipurpose = require("discord-multipurpose");

console.log(Multipurpose.DiscordEmoji.food.apple);
// Logs "🍎"
```

- #### Discord Image Manipulation
	- You need `canvas` installed to use these functions, discord.js is not required for these. If you are on Windows and have never used canvas previously, you will probably need to install `windows-build-tools` using `npm i -g windows-build-tools` along with GTK-2 & Python. Refer to [this](https://www.npmjs.com/package/canvas) for further information
	- Methods
		- **ping**: 
			- Draws a Discord ping across the user's image
			- **Parameters**: 
				- avatar *(Type: string | Buffer, Required: true)*: The avatar of the user
				<img src="/Tests/Image/Ping.png" alt="Ping">

		- **fakeReply**:
			- Draws a fake reply yk
			- **Parameters**:
				- avatar1 *(Type: string | Buffer, Required: true)*: The avatar of the user who is replying
				- avatar2 *(Type: string | Buffer, Required: true)*: The avatar of the user being replied to
				- username1 *(Type: string, Required: true)*: The nickname/username of the user who is replying
				- username2 *(Type: string, Required: true)*: The nickname/username of the user who is being replied to
				- messageText *(Type: string, Required: true)*: The content of the sent message
				- replyText *(Type: string, Required: true)*: The content of the replied message
				- hex1 *(Type: string, Required: false)*: The colour of the role of the replying user
				- hex2 *(Type: string, Required: false)*: The colour of the role of the replying user
				- mode *(Type: string, Options: 'light', 'dark', Required: false, default: dark)*: The mode you want the stuff to be displayed in
				<img src="/Tests/Image/FakeReply-light.png" alt="FakeReply-light">
				<img src="/Tests/Image/FakeReply-dark.png" alt="FakeReply-dark">

		- **invert**:
			- Inverts the Image colours
			- **Parameters**:
				- avatar *(Type: string | Buffer)*: The image, whose colours you want to invert
				<img src="/Tests/Image/invert.png" alt="invert">

		- **sepia**:
			- Applies Sepia effect on to the image
			- **Parameters**:
				- avatar *(Type: string | Buffer)*: The image on which you want to apply the effect/filter
				<img src="/Tests/Image/Sepia.png" alt="Sepia">

		- **greyscale**:
			- Applies greyscale filter on the image
			- **Parameters**:
				- avatar *(Type: string | Buffer)*: The image on which you want to apply the filter
				<img src="/Tests/Image/greyscale.png" alt="greyscale">

		- **blur**:
			- Blurs an Image
			- **Parameters**:
				- avatar *(Type: string | Buffer)*: The image which you want to blur
				<img src="/Tests/Image/blur.png" alt="blur">
	- Example
		```js
		const Multipurpose = require("discord-multipurpose");
		const Discord = require("discord.js");

		const client = new Discord.Client();

		client.on("ready", () => console.log(`Logged in as ${client.user.tag}!`));

		client.on("message", async (message) => {
			if(message.author.bot) return;

			if(message.content.toLowerCase() === ">ping") {
				const ping = await Multipurpose.Image.ping(message.author.displayAvatarURL({ format: 'png' }));
				return message.channel.send(new MessageAttachment(ping, "ping.png"));
			}
		});
		```


# Post Script
> ### ℹ️ Contact me at `SpiderBro#8604`

> Feel free to make an issue or a PR in the GitHub [Repository](https://github.com/SpiderMath/Discord-Multipurpose)