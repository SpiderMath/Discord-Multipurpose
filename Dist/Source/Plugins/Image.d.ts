/// <reference types="node" />
export default class Image {
    static fakeReply(avatar1: string, avatar2: string, messageText: string, replyText: string, username1: string, username2: string, hex1?: string, hex2?: string, mode?: "light" | "dark"): Promise<Buffer>;
    static ping(avatar: string): Promise<Buffer>;
}
//# sourceMappingURL=Image.d.ts.map