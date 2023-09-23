import crypto from 'crypto';

function encryptPassword(secret, encryptionKey) {
  const algorithm = 'aes-256-ecb'; // ECB mode does not use an IV
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey), Buffer.alloc(0)); // Empty buffer for IV
  let encryptedSecret = cipher.update(secret, 'utf-8', 'hex');
  encryptedSecret += cipher.final('hex');
  return encryptedSecret;
}

function decryptPassword(encryptedSecret, encryptionKey) {
    const algorithm = 'aes-256-ecb'; // Use the same algorithm as encryption
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey), Buffer.alloc(0)); // Empty buffer for IV
    let decryptedSecret = decipher.update(encryptedSecret, 'hex', 'utf-8');
    decryptedSecret += decipher.final('utf-8');
    return decryptedSecret;
}

function generateEncryptionKey() {
    const keyLengthInBytes = 128; 
    return crypto.randomBytes(keyLengthInBytes).toString('hex');
}

return {
    encryptPassword,
    decryptPassword,
    generateEncryptionKey,
};