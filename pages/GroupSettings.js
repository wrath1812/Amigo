import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

import GroupIcon from '../components/GroupIcon';
import { calcWidth, calcHeight, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import GroupSettingsIcon from '../assets/GroupSettings.png';
import AddContactIcon from "../assets/addContact.png";
import ShareIcon from "../assets/share.png";

const MemberItem = ({ icon, name, phone, isIcon }) => (
    <View style={styles.memberItem}>
        {isIcon ? <GroupIcon image={icon}/> : <MaterialCommunityIcons name="delete-outline" size={24} color={"rgba(253,64,64,0.59)"} />}
        <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{name}</Text>
            <Text style={styles.memberPhone}>{phone}</Text>
        </View>
    </View>
);

const GroupScreen = ({ navigation, route: { params: { group } } }) => {
    const [groupMembers, setGroupMembers] = useState([
        { name: 'You', phoneNumber: '+911234567890', isAdmin: true },
        { name: 'Binny', phoneNumber: '+911234567890', isAdmin: false },
    ]);

    useEffect(() => {
        setGroupMembers(group.members);
    }, [group]);

    const renderMemberItem = ({ item }) => (
        <MemberItem name={item.name} phone={item.phoneNumber} icon={GroupSettingsIcon} isIcon/>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.centeredView}>
                    <GroupIcon size={{ width: calcWidth(20), height: calcWidth(20) }} image={GroupSettingsIcon} isIcon={true}/>
                </View>
                <View style={styles.header}>
                    <View style={styles.groupInfo}>
                        <View style={styles.spacing}>
                            <Text style={styles.groupName}>Miami trip</Text>
                            <Text style={styles.groupCreatedAt}>Created on 25 Dec 2023, 10:32 PM</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {}}>
                        <SimpleLineIcons name="pencil" size={calcHeight(3)} color="white"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.memberListContainer}>
                    <View style={styles.listHeader}>
                        <Text style={styles.totalMembersTitle}>Total Members</Text>
                    </View>
                    <FlatList
                        data={groupMembers}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderMemberItem}
                        ListHeaderComponent={
                            <>
                                <MemberItem icon={AddContactIcon} name="Add new members" isIcon/>
                                <MemberItem icon={ShareIcon} name="Share group Link" phone="Help members find the group" isIcon/>
                            </>
                        }
                        ListFooterComponent={<MemberItem name="Delete group" phone=""/>}
                    />
                </View>
            </ScrollView>
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
    totalMembersTitle: {
        fontSize: getFontSizeByWindowWidth(12),
        color: COLOR.TEXT,
        fontWeight: 'bold',
    },
    memberItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: calcWidth(5),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.BORDER_COLOR,
        marginHorizontal:calcWidth(5)
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
    centeredView: {
        alignItems: 'center',
        margin: calcHeight(5),
    },
    spacing: {
        gap: calcHeight(1),
    },
    listHeader: {
        marginBottom: calcHeight(2),
        padding: calcWidth(5),
        borderBottomColor: COLOR.BORDER_COLOR,
        borderBottomWidth: 1,
    },
});

export default GroupScreen;
