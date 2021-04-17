import { version } from "../package.json";
import Util from "./Classes/Util";
import MiniGames from "./Classes/Minigames";

export default class DiscordMultipurpose {
	static version: string = version;
	static Util = Util;
	static MiniGames = MiniGames;
};