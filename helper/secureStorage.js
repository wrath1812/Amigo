import * as SecureStore from 'expo-secure-store';

async function storeSecret(key, secret) {
  try {
    await SecureStore.setItemAsync(key, secret);
  } catch (error) {
    console.error('Error storing secret:', error);
  }
}

async function retrieveSecret(key) {
  try {
    const secret = await SecureStore.getItemAsync(key);
    if (secret) {
        return secret;
    } else {
        return null;
    }
  } catch (error) {
    console.error('Error retrieving secret:', error);
  }
}

export { storeSecret, retrieveSecret };

