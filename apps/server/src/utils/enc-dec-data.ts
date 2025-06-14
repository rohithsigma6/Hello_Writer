import crypto from "crypto";

const algorithm = "aes-256-cbc"; // Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

interface EncryptedData {
  key: string;
  iv: string;
  encryptedData: string;
}

// Encrypting text
export const encrypt = ({ gid }: { gid: string }): EncryptedData => {
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(gid);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    key: key.toString("hex"),
    iv: iv.toString("hex"),
    encryptedData: encrypted.toString("hex"),
  };
};

// Decrypting text
export const decrypt = (text: EncryptedData): string | null => {
  try {
    const iv = Buffer.from(text.iv, "hex");
    const key = Buffer.from(text.key, "hex");
    const encryptedText = Buffer.from(text.encryptedData, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.log(error);
    return null;
  }
};