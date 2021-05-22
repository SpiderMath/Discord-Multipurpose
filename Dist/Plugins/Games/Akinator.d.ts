import { Message } from "discord.js";
declare type Region = "en" | "en_objects" | "en_animals" | "ar" | "cn" | "de" | "de_animals" | "es" | "es_animals" | "fr" | "fr_objects" | "fr_animals" | "il" | "it" | "it_animals" | "jp" | "jp_animals" | "kr" | "nl" | "pl" | "pt" | "ru" | "tr" | "id";
export default class Akinator {
    private aki;
    private message;
    constructor(message: Message, region?: Region);
    private verify;
    run(): Promise<Message>;
}
export {};
//# sourceMappingURL=Akinator.d.ts.map