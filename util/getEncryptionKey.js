import { generateEncryptionKey } from '../helper/encryption';
import { storeSecret, retrieveSecret } from '../helper/secureStorage';
import { ENCRYPTION_KEY } from '../constants/string';

async function getEncryptionKey() {
    let key = await retrieveSecret(ENCRYPTION_KEY);
    if (!key) {
        const key = generateEncryptionKey();
        await storeSecret(ENCRYPTION_KEY, key);
    }
    return key;
}

export default getEncryptionKey;