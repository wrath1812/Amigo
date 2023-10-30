import React, { useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { calcHeight } from '../helper/res';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import PAGES from '../constants/pages';

function Settings({ navigation }) {
    const { cards } = useAuth();

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
