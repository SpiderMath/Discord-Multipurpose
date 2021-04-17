import { Message } from "discord.js";
export default class ShuffleWord {
    private words;
    private message;
    private winMessage;
    private word;
    private count;
    private scrambledWord;
    constructor(message: Message, tryCount?: number, congratulatoryMessage?: string, words?: string[]);
    start(): Promise<void>;
}
//# sourceMappingURL=ShuffleWord.d.ts.map