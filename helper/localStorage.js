import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalStoreData = async (objKey, value) => {
    try {
        if (!objKey) {
            return { status: false };
        }
        const jsonValue = JSON.stringify(value);
        return await AsyncStorage.setItem(objKey, jsonValue);
    } catch (error) {
        return { status: false, error };
    }
};
export const removeLocalStoreData = async (objKey) => {
    try {
        if (!objKey) {
            return { status: false };
        }
        return AsyncStorage.removeItem(objKey);
    } catch (error) {
        return { status: false, error };
    }
};

export const getLocalStoreData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        return error;
        // error reading value
    }
};

export const clearAllLocalStoreData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        return { status: true };
    } catch (error) {
        return { status: false, error };
    }
};

// removeLocalStoreData('token');
