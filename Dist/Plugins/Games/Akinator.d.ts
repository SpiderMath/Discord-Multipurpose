import { Aki } from "aki-api.ts";
import { Message } from "discord.js";
declare type Region = "en" | "en_objects" | "en_animals" | "ar" | "cn" | "de" | "de_animals" | "es" | "es_animals" | "fr" | "fr_objects" | "fr_animals" | "il" | "it" | "it_animals" | "jp" | "jp_animals" | "kr" | "nl" | "pl" | "pt" | "ru" | "tr" | "id";
interface AkiEmojis {
    yes?: string;
    no?: string;
    idk?: string;
    probably?: string;
    probablyNot?: string;
    previous?: string;
}
export default class Akinator {
    region: Region;
    message: Message;
    aki: Aki;
    baseEmbed: any;
    validReactions: string[];
    msg: Message;
    AkiEmojis: AkiEmojis;
    i: number;
    count: number;
    guessCount: number;
    constructor(message: Message, region?: Region, validReactions?: string[], akiEmojis?: AkiEmojis);
    start(): Promise<Message | undefined>;
    private run;
    private win;
}
export {};
//# sourceMappingURL=Akinator.d.ts.map