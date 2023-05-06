import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();
const {subtle} = (crypto.webcrypto as unknown as typeof globalThis.crypto);
const SIGNATURE_ALGORITHM = "HMAC";
const HASH_TYPE = "SHA-256";

const textEncoder = new TextEncoder();
export async function sign(data: string) {
    const key = process.env.SECRET_KEY;
    if (!key) {
        throw new Error("Secret Key Not Found");
    }
    const encodedData = textEncoder.encode(data);
    const encodedKey = textEncoder.encode(key);
    
    const importedKey = await subtle.importKey(
        "raw",
        encodedKey,
        {name: SIGNATURE_ALGORITHM, hash: HASH_TYPE},
        false,
        ["sign"]
    );

    const signature = await subtle.sign(SIGNATURE_ALGORITHM, importedKey, encodedData);
    return Buffer.from(signature).toString("hex"); 
}

export async function verify(data: string, signature: string) {
    const key = process.env.SECRET_KEY;
    if (!key) {
        throw new Error("Secret Key Not Found");
    }
    const encodedData = textEncoder.encode(data);
    const encodedSignature = new Uint8Array(Buffer.from(signature, 'hex'));
    const encodedKey = textEncoder.encode(key);
    const importedKey = await subtle.importKey(
        "raw",
        encodedKey,
        {name: SIGNATURE_ALGORITHM, hash: HASH_TYPE},
        false,
        ["verify"]
    );

    return await subtle.verify(SIGNATURE_ALGORITHM, importedKey, encodedSignature, encodedData);
}