/// <reference types="node" />
export default class Image {
    /**
     * @param avatar1 The avatar of the user who is replying
     * @param avatar2 The avatar of the user being replied to
     * @param username1 The nickname/username of the user who is replying
     * @param username2 The nickname/username of the user who is being replied to
     * @param messageText The content of the sent message
     * @param replyText The content of the replied message
     * @param hex1 The colour of the role of the replying user
     * @param hex2 The colour of the role of the replying user
     * @param mode The mode you want the stuff to be displayed in
     * @default hex1 #ffffff
     * @default hex2 #ffffff
     * @default mode dark
     */
    static fakeReply(avatar1: string | Buffer, avatar2: string | Buffer, replyText: string, messageText: string, username1: string, username2: string, hex1?: string, hex2?: string, mode?: "light" | "dark"): Promise<Buffer>;
    /**
     * @param avatar The avatar of the user who will be appearing in the ping
     */
    static ping(avatar: string | Buffer): Promise<Buffer>;
    /**
     * @param avatar The avatar of the user, whose colour you want to invert
    */
    static invert(avatar: string | Buffer): Promise<Buffer>;
    /**
     * @param avatar The image on which you want to apply the filter
     */
    static sepia(avatar: string | Buffer): Promise<Buffer>;
    /**
     * @param avatar The image on which you want to apply the filter
    */
    static greyscale(avatar: string | Buffer): Promise<Buffer>;
    /**
     * @param avatar The image which you want to blur
    */
    static blur(avatar: string | Buffer): Promise<Buffer>;
}
//# sourceMappingURL=Image.d.ts.map