import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    Pressable,
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

function MenuOption({
    iconName,
    label,
    IconComponent,
    additionalStyle,
    onPress,
}) {
    return (
        <Pressable
            style={[styles.menuOption, additionalStyle]}
            onPress={onPress}
        >
            <IconComponent name={iconName} size={calcHeight(3)} color="white" />
            <Text style={styles.menuText}>{label}</Text>
        </Pressable>
    );
}

function ProfileScreen({ navigation }) {
    const { user, logout } = useAuth();

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

    return (
        <SafeAreaView style={styles.container}>
            {/* User Info */}
            <View style={styles.userInfo}>
                <Image source={SignUpImage} style={styles.userImage} />
                <View>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userPhone}>{user.phoneNumber}</Text>
                </View>
                <Pressable>
                    <Feather
                        name="edit-3"
                        size={calcHeight(3)}
                        color={COLOR.BUTTON}
                    />
                </Pressable>
            </View>

            {/* Invite Friends */}
            <Pressable style={styles.inviteFriends}>
                <Octicons
                    name="cross-reference"
                    size={calcHeight(2)}
                    color="white"
                />
                <Text style={styles.menuText}>Invite Friends</Text>
            </Pressable>

            {/* Other Menu Options */}
            {menuOptions.map((option, index) => (
                <MenuOption
                    key={index}
                    label={option.label}
                    iconName={option.iconName}
                    IconComponent={option.IconComponent}
                />
            ))}

            {/* Logout */}
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
    menuOption: {
        flexDirection: 'row',
        margin: calcWidth(5),
        alignItems: 'center',
        gap: calcWidth(10),
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
});

export default ProfileScreen;
