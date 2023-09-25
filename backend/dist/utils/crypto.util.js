"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = void 0;
const crypto = require('crypto-js');
const config_1 = require("../config/config");
const decrypt = (cipherText) => {
    if (cipherText === '')
        return '';
    const key = config_1.config.CRYPTO_SECRET;
    return crypto.AES.decrypt(cipherText, key).toString(crypto.enc.Utf8);
};
exports.decrypt = decrypt;
//# sourceMappingURL=crypto.util.js.map