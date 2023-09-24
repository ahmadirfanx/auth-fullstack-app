const CryptoJS = require("crypto-js");

export function encrypt(_plainText: string) {
    return CryptoJS.AES.encrypt(_plainText, process.env.REACT_APP_CRYPTO_SECRET).toString();
  }

export function decrypt(_cipherText: string) {
    return CryptoJS.AES.decrypt(_cipherText, process.env.REACT_APP_CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
  }