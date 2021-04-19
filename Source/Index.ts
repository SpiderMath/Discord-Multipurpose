import { version } from "../package.json";
import Fun from "./Classes/Fun";
import MiniGames from "./Classes/Minigames";
import Animals from "./Classes/Animals";

export default class DiscordMultipurpose {
	static version: string = version;
	static Fun = Fun;
	static MiniGames = MiniGames;
	static Animals = Animals;
};