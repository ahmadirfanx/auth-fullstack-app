const crypto = require('crypto-js')
import { config } from "src/config/config"

// Service to encrypt/decrypt string

// decrypt cipher text
export const decrypt = (cipherText) => {

    if (cipherText === '') return ''
    const key = config.CRYPTO_SECRET
    return crypto.AES.decrypt(cipherText, key).toString(crypto.enc.Utf8)
}