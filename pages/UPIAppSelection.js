import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    Linking,
} from 'react-native';
import COLOR from '../constants/Colors';
import UPIApps from '../constants/UpiApps';
import { useTransaction  } from '../context/TransactionContext';
import { getFontSizeByWindowWidth } from '../helper/res';
import PAGES from "../constants/pages";

const UPIAppSelection = ({ navigation }) => {
    const [selectedUPIApp, setSelectedUPIApp] = useState('');
    const {upiParams}=useTransaction();

    const handleSelectApp = (appName, generateDeeplink) => {
        setSelectedUPIApp(appName);
        const deepLink = generateDeeplink(upiParams);
        try{
        if(Linking.canOpenURL(deepLink))
        {
            Linking.openURL(deepLink);
            navigation.navigate(PAGES.BALANCE);
        }
        else{
            alert("App not found");
        }}
        catch(e)
        {
            alert("App not found");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {UPIApps.map((app, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => handleSelectApp(app.name, app.generateDeeplink)}
                >
                    {app.icon}
                    <Text style={styles.text}>{app.name}</Text>
                </TouchableOpacity>
            ))}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color:"white",
        fontSize:getFontSizeByWindowWidth(20)
    },
});

export default UPIAppSelection;
