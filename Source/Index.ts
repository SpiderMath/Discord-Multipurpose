import { version } from "../package.json";
import Fun from "./Classes/Fun";
import MiniGames from "./Classes/Minigames";

export default class DiscordMultipurpose {
	static version: string = version;
	static Fun = Fun;
	static MiniGames = MiniGames;
};