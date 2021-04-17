"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    static randomNumber(start = 0, end = 1) {
        if (isNaN(start))
            throw new TypeError("Start is not a Number");
        if (isNaN(end))
            throw new TypeError("End is not a Number");
        return start + Math.floor(Math.random() * (end - start + 1));
    }
}
exports.default = Util;
;
//# sourceMappingURL=Util.js.map