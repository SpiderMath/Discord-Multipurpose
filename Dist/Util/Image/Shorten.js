"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shorten(text, len) {
    if (typeof text !== "string")
        return "";
    if (text.length <= len)
        return text;
    return text.substr(0, len).trim() + "...";
}
exports.default = shorten;
;
//# sourceMappingURL=Shorten.js.map