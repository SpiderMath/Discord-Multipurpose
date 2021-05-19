import DiscordEmoji from "./Plugins/DiscordEmoji";
import Image from "./Plugins/Image";
import confirmation from "./Plugins/confirmation"
import chatBot from './Plugins/chatBot'

const multipurpose = { DiscordEmoji, Image, confirmation, chatBot }

export {
	Image,
	DiscordEmoji,
	confirmation,
	chatBot
};

export default multipurpose; //* import multipurpose from 'discord-multipurpose'; (import as a whole)