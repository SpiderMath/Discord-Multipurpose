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
	- **⚠ You need `canvas` installed to use these functions, discord.js is not required for these. If you are on Windows and have never used canvas previously, you will probably need to install `windows-build-tools` using `npm i -g windows-build-tools` along with GTK-2 & Python. Refer to [this](https://www.npmjs.com/package/canvas) for further information ⚠**
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

- #### Discord Util
	- Works only for [Discord.js](https://discord.js.org) bots, you need it installed to use these methods
	- Methods
		- **paginateEmbed**:
			- Paginate your Embeds using reactions!
			- **Parameters**
				- msg *(Type: Message, required: true)*: The message object, which you get from the Message Event
				- pages *(Type: MessageEmbed[], required: true)* :An array of MessageEmbeds, which you want to be in list
				- emojiList *(Type: string[])*: An array of left & right arrows, emojiList[0] is left arrow & emojiList[1] is the right arrow. Default: `["⏪", "⏩"]`
				- timeout *(Type: number)*: The time for which the pagination will be active (in miliseconds)
				Default: `120000`ms (2 minutes)
			- **⚠ The following example is only there to show how it works, you need to code the commands, you can check the code of the concerned command [here](https://github.com/SpiderMath/Intrepid/blob/cd9dfd6e41d74ba4dbe678c937f5b32b95942d09/Source/Commands/Developer/MDNSearchCommand.ts). You only get the reaction menu feature.**  

				<img src="/Tests/DiscordUtil/paginateEmbed_Sample.gif" alt="PaginateEmbed Sample">

		- **confirmation**:
			- Get the confirmation from the user on an action
			- **Parameters**
				- msg *(Type: Message, required: true)*: The message which you want to be reacted upon
				- author *(Type: User, required: true)*: The user whose confirmation is needed
				- validReactions *(Type: string[], required: false, length: 2)*: The emojis for yes and no. validReactions[0] has to be the one for yes & validReactions[1] has to be the one for no
				*Default: ["✔", "❌"]*
				- time *(Type: number, required: false)*: The time for which you want to wait for the reactions (in miliseconds)
				*Default: `60000`ms (1 minute)*
				- defaultResponse *(Type: boolean, required: false)*: The result which you want to get if the user does not respond.
				*Default: false*
			- **⚠ The following example shows an implementation of a command which works on using this function**
				<img src="/Tests/DiscordUtil/Confirmation_Sample.gif" alt="Confirmation Sample">

# Post Script
> ℹ️ Contact me at `SpiderBro#8604`

> Feel free to make an issue or a PR in the GitHub [Repository](https://github.com/SpiderMath/Discord-Multipurpose)

> Credits to [Dr. Time™](https://github.com/Rubayz) & [Conqueror](https://github.com/hasib-rashid) for contributing!