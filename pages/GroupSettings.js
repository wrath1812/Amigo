import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    ScrollView,
    TextInput,
    Image,
    Share,
} from 'react-native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { DEEP_LINK_URL } from '@env';
import GroupIcon from '../components/GroupIcon';
import Loader from '../components/Loader';
import UserAvatar from '../components/UserAvatar';
import { useGroup } from '../context/GroupContext';
import { calcWidth, calcHeight, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import apiHelper from '../helper/apiHelper';
import PAGES from '../constants/pages';

const MemberItem = ({ name, phone, _id }) => (
    <View style={styles.memberItem}>
        {name && _id && <UserAvatar user={{ name, _id }} />}
        <View style={[styles.memberInfo,{
            gap:calcHeight(1)
        }]}>
            <Text style={styles.memberName}>{name}</Text>
            <Text style={styles.memberPhone}>{phone}</Text>
        </View>
    </View>
);

const GroupScreen = ({ navigation, route: { params: { balance } } }) => {
    const { group, setGroup } = useGroup();
    const [groupMembers, setGroupMembers] = useState();
    const [isEditing, setIsEditing] = useState();
    const [groupName, setGroupName] = useState();
    const groupRef = useRef();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setGroupMembers(group.members);
        setIsEditing(false);
        setGroupName(group.name);
    }, [group]);

    const submitGroupData = async () => {
        setIsEditing(false);
        apiHelper.patch(`/group?id=${group._id}`, {
            groupName: groupRef.current,
        });
        setGroup((prev) => ({ ...prev, name: groupRef.current }));
    };

    const shareGroupLink = () => {
        Share.share({
            message: 'Join the group at Amigo: ' + `${DEEP_LINK_URL}join?groupId=${group._id}`,
        });
    };

    const leaveGroup = async () => {
        setLoading(true);
        await apiHelper.delete(`/group/${group._id}`);
        navigation.navigate(PAGES.GROUP_LIST);
        setLoading(false);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                isEditing ? (
                    <TouchableOpacity onPress={() => setIsEditing(false)}>
                        <Text style={[{ fontWeight: 'bold', color: COLOR.TEXT }]}>Cancel</Text>
                    </TouchableOpacity>
                ) : undefined,
            headerRight: () =>
                isEditing ? (
                    <TouchableOpacity onPress={() => submitGroupData()}>
                        <Text style={[{ fontWeight: 'bold', color: COLOR.TEXT }]}>Done</Text>
                    </TouchableOpacity>
                ) : undefined,
        });
    }, [navigation, isEditing]);

    const renderMemberItem = ({ item }) => (
        <MemberItem name={item.name} phone={item.phoneNumber} _id={item._id} />
    );

    const renderListHeader = () => (
        <>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(PAGES.ADD_PEOPLE);
                }}
                style={styles.memberItem}
            >
                <Image
                    source={require('../assets/icons/addMembers.png')}
                    style={{ height: calcHeight(5), width: calcHeight(5) }}
                />
                <View style={{
                    marginLeft:calcWidth(3)
                }}>
                <Text style={styles.buttonText}>Add new members</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.memberItem} onPress={shareGroupLink}>
                <Image
                    source={require('../assets/icons/share.png')}
                    style={{ height: calcHeight(5), width: calcHeight(5) }}
                />
                <View style={{
                    marginLeft:calcWidth(3)
                }}>
                    <Text style={styles.buttonText}>Share Group Link</Text>
                    <Text style={{ color: COLOR.TEXT }}>Help members find this group</Text>
                </View>
            </TouchableOpacity>
        </>
    );

    const renderListFooter = () => (
        !balance && (
            <TouchableOpacity style={styles.memberItem} onPress={leaveGroup}>
                <Ionicons name="exit-outline" size={calcHeight(5)} color="red" />
                <View>
                    <Text style={{ color: 'red' }}>Leave Group</Text>
                </View>
            </TouchableOpacity>
        )
    );

    return loading ? (
        <Loader />
    ) : (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableOpacity style={styles.centeredView}>
                    <GroupIcon size={15} groupId={group._id} />
                </TouchableOpacity>
                <View style={styles.header}>
                    <View style={styles.groupInfo}>
                        <View style={styles.spacing}>
                            {isEditing ? (
                                <TextInput
                                    onChangeText={(text) => {
                                        setGroupName(text);
                                        groupRef.current = text;
                                    }}
                                    value={groupName}
                                    autoFocus
                                    style={styles.groupName}
                                />
                            ) : (
                                <Text style={styles.groupName}>{groupName}</Text>
                            )}

                            <Text style={styles.groupCreatedAt}>
                                Created on 25 Dec 2023, 10:32 PM
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setIsEditing((prev) => !prev)}>
                        <SimpleLineIcons name="pencil" size={calcHeight(3)} color="white" />
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
                        ListHeaderComponent={renderListHeader}
                        ListFooterComponent={renderListFooter}
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
        marginHorizontal: calcWidth(2),
    },
    memberInfo: {
        flex: 1,
        marginLeft:calcWidth(3)
    },
    memberName: {
        fontSize: getFontSizeByWindowWidth(12),
        color: 'white',
        fontWeight:"bold"
    },
    memberPhone: {
        fontSize: getFontSizeByWindowWidth(8),
        color: 'white',
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
    buttonText: {
        color: COLOR.BUTTON,
        fontSize: getFontSizeByWindowWidth(15),
        fontWeight:"bold"
    }
});

export default GroupScreen;
