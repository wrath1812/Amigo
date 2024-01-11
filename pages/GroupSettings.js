import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import {
    Ionicons,
    MaterialCommunityIcons,
    AntDesign,
    SimpleLineIcons,
} from '@expo/vector-icons';
import GroupIcon from '../components/GroupIcon';
import { calcWidth, calcHeight, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import GroupSettingsIcon from '../assets/GroupSettings.png';
const GroupScreen = ({ navigation }) => {
    // Dummy data for group members, replace with your actual data
    const [groupMembers, setGroupMembers] = useState([
        { name: 'You', phoneNumber: '+911234567890', isAdmin: true },
        { name: 'Binny', phoneNumber: '+911234567890', isAdmin: false },
    ]);

    // Function to render each member item
    const renderMemberItem = ({ item }) => (
        <View style={styles.memberItem}>
            <Image source={{ uri: 'image-url' }} style={styles.memberAvatar} />
            <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{item.name}</Text>
                <Text style={styles.memberPhone}>{item.phoneNumber}</Text>
            </View>
        </View>
    );

    // Function to handle adding a new member
    const handleAddMember = () => {
        // Implement your logic to add new member
    };

    // Function to handle sharing the group link
    const handleShareGroupLink = () => {
        // Implement your logic to share group link
    };

    // Function to handle deleting the group
    const handleDeleteGroup = () => {
        // Implement your logic to delete group
    };

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    alignItems: 'center',
                    margin: calcHeight(5),
                }}
            >
                <GroupIcon
                    size={{ width: calcWidth(20), height: calcWidth(20) }}
                    image={GroupSettingsIcon}
                />
            </View>
            <View style={styles.header}>
                <View style={styles.groupInfo}>
                    <View
                        style={{
                            gap: calcHeight(1),
                        }}
                    >
                        <Text style={styles.groupName}>Miami trip</Text>
                        <Text style={styles.groupCreatedAt}>
                            Created on 25 Dec 2023, 10:32 PM
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {}}>
                    <SimpleLineIcons
                        name="pencil"
                        size={calcHeight(3)}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.memberListContainer}>
                <View
                    style={{
                        marginBottom: calcHeight(5),
                        padding: calcWidth(5),
                        borderBottomColor: COLOR.BORDER_COLOR,
                        borderBottomWidth: 1,
                    }}
                >
                    <Text style={styles.totalMembersTitle}>Total Members</Text>
                </View>
                <FlatList
                    data={groupMembers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderMemberItem}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: calcHeight(2),
        padding: calcHeight(3),
        borderColor: COLOR.BORDER_COLOR,
        borderWidth: 1,
        borderRadius: 10,
    },
    groupInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupName: {
        fontSize: getFontSizeByWindowWidth(17),
        fontWeight: 'bold',
        color: COLOR.TEXT,
    },
    groupCreatedAt: {
        fontSize: getFontSizeByWindowWidth(8),
        color: COLOR.TEXT,
    },
    memberListContainer: {
        // padding: calcWidth(5),
    },
    totalMembersTitle: {
        fontSize: getFontSizeByWindowWidth(12),
        color: COLOR.TEXT,
        fontWeight: 'bold',
    },
    memberItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    memberAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: 16,
        color: 'white',
    },
    memberPhone: {
        fontSize: 14,
        color: 'grey',
    },
});

export default GroupScreen;
