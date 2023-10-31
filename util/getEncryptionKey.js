import { ENCRYPTION_KEY } from '../constants/string';
import { generateEncryptionKey } from '../helper/encryption';
import { storeSecret, retrieveSecret } from '../helper/secureStorage';

async function getEncryptionKey() {
    const key = await retrieveSecret(ENCRYPTION_KEY);
    if (!key) {
        const key = generateEncryptionKey();
        await storeSecret(ENCRYPTION_KEY, key);
    }
    return key;
}

export default getEncryptionKey;
