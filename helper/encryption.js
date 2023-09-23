import  CryptoES from 'crypto-es';

// Function to generate an encryption key
function generateEncryptionKey() {
  // Key length in bytes (e.g., 32 bytes for a 256-bit key)
  const keyLengthInBytes = 32;
  
  // Generate a random key
  const key = CryptoES.lib.WordArray.random(keyLengthInBytes);
  
  // Convert the key to a hexadecimal string
  const keyHex = key.toString();
  
  return keyHex;
}

// Function to encrypt data
function encryptData(data, encryptionKey) {
  // Convert the data to a string (assuming it's not already)
  const dataString = typeof data === 'string' ? data : JSON.stringify(data);

  // Encrypt the data using AES encryption
  const encryptedData = CryptoES.AES.encrypt(dataString, encryptionKey).toString();

  return encryptedData;
}

// Function to decrypt data
function decryptData(encryptedData, encryptionKey) {
  // Decrypt the data using AES decryption
  const decryptedBytes = CryptoES.AES.decrypt(encryptedData, encryptionKey);
  
  // Convert the decrypted bytes to a string
  const decryptedData = decryptedBytes.toString(CryptoES.enc.Utf8);

  // Parse the JSON if needed
  try {
    return JSON.parse(decryptedData);
  } catch (error) {
    return decryptedData;
  }
}

export { generateEncryptionKey, encryptData, decryptData };