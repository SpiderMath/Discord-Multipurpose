"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function chatBot(message, input, uuid = 0o101) {
    if (!message)
        throw new ReferenceError('"message" is not defined');
    if (!input)
        throw new ReferenceError('"input" is not defined');
    axios_1.default.get(`https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(input)}&uid=${uuid}`).then((response) => {
        message.reply(response.data.response);
    });
}
exports.default = chatBot;
//# sourceMappingURL=chatBot.js.map