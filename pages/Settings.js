import React, { useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { calcHeight } from '../helper/res';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import PAGES from '../constants/pages';
import CardHtml from '../components/CardHtml';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import Card from '../components/card';
import ViewShot, { captureRef } from 'react-native-view-shot';
import getBase64FromFile from '../helper/getBase64FromFile';

function Settings({ navigation }) {
    const { cards } = useAuth();
    const ref = useRef(null);

    const captureQrCode = async () => {
        if (ref.current) {
            try {
                // Capture the image
                const fileUri= await ref.current.capture();
                const base64String = await getBase64FromFile(fileUri);
                const imageUri = `data:image/jpg;base64,${base64String}`;
                return imageUri;
            } catch (error) {
                console.error('Error capturing QR code:', error);
            }
        }
    };

    const handleExport = () => {
        if (cards.length === 0) {
            alert('No cards to export');
            return;
        }
        navigation.navigate(PAGES.EXPORT);
    };

    const handleImport = () => {
        navigation.navigate(PAGES.IMPORT);
    };

    const handleShare = async () => {
        const imageUri = await captureQrCode();
        const html = CardHtml(cards[0], imageUri);
        const { uri } = await Print.printToFileAsync({ html });
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.option}
                onPress={() => navigation.navigate(PAGES.ADD_CARD)}
            >
                <Text style={styles.optionText}>Add Card</Text>
                <AntDesign name="plus" size={calcHeight(3)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={handleExport}>
                <Text style={styles.optionText}>Export</Text>
                <AntDesign name="upload" size={calcHeight(3)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={handleImport}>
                <Text style={styles.optionText}>Import</Text>
                <AntDesign name="download" size={calcHeight(3)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={handleShare}>
                <Text style={styles.optionText}>Share Cards</Text>
                <AntDesign name="download" size={calcHeight(3)} color="black" />
            </TouchableOpacity>
            <ViewShot
                options={{ format: 'jpg', quality: 0.9 }}
                ref={ref}
                style={{ backgroundColor: '#fff' ,zIndex: -1, position: 'absolute',top:-1000}}
            >
                <Card item={{ type: cards[0].type }} />
            </ViewShot>
        </View>
    );
}

const styles = {
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: calcHeight(2),
        backgroundColor: '#fff',
        margin: calcHeight(1),
    },
    optionText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#333',
    },
};

export default Settings;
