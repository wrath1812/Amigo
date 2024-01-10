import React,{useLayoutEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    Pressable,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import SignUpImage from '../assets/SignUp.png';
import {
    Feather,
    Octicons,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';
import  MenuOption  from "../components/AccountPageOption"
import apiHelper from "../helper/apiHelper";


function ProfileScreen({ navigation }) {
    const { user, logout,editUser } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(user.name);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

    function submitUserData()
    {
        if(phoneNumber.length!=10){
            alert("Invalid Phone Number")
        return;
        }
        if(!name || name=="")
        {
            alert("Empty Name")
        return;
        }
        editUser({phoneNumber,name});
        setEditMode(false);
    }

    const menuOptions = [
        {
            label: 'Account Settings',
            iconName: 'settings-outline',
            IconComponent: Ionicons,
        },
        {
            label: 'Help & Support',
            iconName: 'message-square',
            IconComponent: Feather,
        },
        {
            label: 'About',
            iconName: 'cellphone-dock',
            IconComponent: MaterialCommunityIcons,
        },
    ];

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                editMode ? (
                    <TouchableOpacity 
                        onPress={() => setEditMode(false)}
                    >
                        <Text style={[styles.bottomBarText, { fontWeight: "bold" }]}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                ) : undefined
            ),
            headerRight: () => (
                editMode ? (
                    <TouchableOpacity 
                        onPress={submitUserData}
                    >
                        <Text style={[styles.bottomBarText, { fontWeight: "bold" }]}>
                            Done
                        </Text>
                    </TouchableOpacity>
                ) : undefined
            ),
        });
    }, [navigation, editMode]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfo}>
                <Image source={SignUpImage} style={styles.userImage} />
                <View>
                    {editMode ? (
                        <TextInput 
                            style={styles.userName} 
                            value={name} 
                            onChangeText={setName} 
                        />
                    ) : (
                        <Text style={styles.userName}>{name}</Text>
                    )}
                    {editMode ? (
                        <TextInput 
                            style={styles.userPhone} 
                            value={phoneNumber} 
                            onChangeText={setPhoneNumber} 
                            keyboardType="numeric"
                        />
                    ) : (
                        <Text style={styles.userPhone}>{phoneNumber}</Text>
                    )}
                </View>
                <Pressable onPress={() => {
                    setEditMode(!editMode)
                    }}>
                    <Feather
                        name="edit-3"
                        size={calcHeight(3)}
                        color={COLOR.BUTTON}
                    />
                </Pressable>
            </View>

            <Pressable style={styles.inviteFriends}>
                <Octicons
                    name="cross-reference"
                    size={calcHeight(2)}
                    color="white"
                />
                <Text style={styles.menuText}>Invite Friends</Text>
            </Pressable>

            {menuOptions.map((option, index) => (
                <MenuOption
                    key={index}
                    label={option.label}
                    iconName={option.iconName}
                    IconComponent={option.IconComponent}
                />
            ))}

            <MenuOption
                label="Logout"
                iconName="logout"
                IconComponent={MaterialIcons}
                additionalStyle={styles.logoutStyle}
                onPress={logout}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    userInfo: {
        flexDirection: 'row',
        margin: calcHeight(3),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userImage: {
        width: calcHeight(8),
        height: calcHeight(8),
        padding: calcWidth(3),
        borderWidth: 1,
        borderColor: COLOR.BUTTON,
        borderRadius: calcWidth(15),
    },
    userName: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: getFontSizeByWindowWidth(18),
    },
    userPhone: {
        color: 'white',
        fontSize: getFontSizeByWindowWidth(10),
        paddingTop: calcHeight(1),
    },
    inviteFriends: {
        alignItems: 'center',
        margin: calcHeight(2),
        borderWidth: 1,
        padding: calcWidth(3),
        borderColor: COLOR.BUTTON,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: calcWidth(6),
    },
    logoutStyle: {
        paddingTop: calcHeight(4),
        borderTopWidth: 0.2,
        borderTopColor: 'rgba(255,255,255,0.15)',
    },
    menuText: {
        color: 'white',
        fontWeight: 'bold',
    },
    bottomBarText:{
        color:COLOR.BUTTON
    }
});

export default ProfileScreen;
