import * as FileSystem from 'expo-file-system';

async function getBase64FromFile(file) {
    try {
        // Read the file as a base64 string
        const base64String = await FileSystem.readAsStringAsync(file, {
            encoding: FileSystem.EncodingType.Base64,
        });

        return base64String;
    } catch (error) {
        console.error('Error reading the file:', error);
        return null; // Handle the error as needed
    }
}

export default getBase64FromFile;
