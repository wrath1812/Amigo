import React, { useCallback, useState } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Pressable,
} from 'react-native';
import Loader from '../components/Loader';
import apiHelper from '../helper/apiHelper';
import PAGES from '../constants/pages';
import FabIcon from '../components/FabIcon';
import { useFocusEffect } from '@react-navigation/native';
import copyToClipBoard from '../helper/copyToClipBoard';
import { Feather } from '@expo/vector-icons';
import NoGroups from '../components/NoGroups';
import COLOR from '../constants/Colors';
import GroupModal from '../components/GroupModal';

function GroupListScreen({ navigation }) {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [createGroupModal,setCreateGroupModal]=useState(false);

    useFocusEffect(
        useCallback(() => {
            // Fetch data again when the screen gains focus
            (async () => {
                setLoading(true);
                const { data } = await apiHelper('/group');
                setGroups(data);
                setLoading(false);
            })();
        }, []),
    );

    return loading ? (
        <Loader />
    ) : (
        <SafeAreaView style={styles.container}>
            {groups.length==0?<NoGroups onPress={()=>{setCreateGroupModal(true)}}/>:(<ScrollView>
                {groups.map((group) => (
                    <Pressable
                        onPress={() => {
                            navigation.navigate(PAGES.TRANSACTION, { group });
                        }}
                        style={styles.group}
                    >
                        <Text key={group._id} style={styles.groupName}>
                            {group.name}
                        </Text>
                        <Pressable
                            key={group._id}
                            onPress={() =>
                                copyToClipBoard(group._id, 'Group Id Copied')
                            }
                        >
                            <Feather name="copy" size={24} color="black" />
                        </Pressable>
                    </Pressable>
                ))}
            </ScrollView>)}
            {/* <FabIcon onPress={() => navigation.navigate(PAGES.ADD_GROUP)} />
            <Pressable
                onPress={() => {
                    navigation.navigate(PAGES.JOIN_GROUP);
                }}
            >
                <Text>Join Group</Text>
            </Pressable> */}
            <GroupModal  visible={createGroupModal} hideModal={()=>setCreateGroupModal(false)}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:COLOR.APP_BACKGROUND
    },
    groupName: {
        fontSize: 16,
        marginVertical: 5, // Add margin for better spacing
    },
    group: {
        flexDirection: 'row',
    },
});

export default GroupListScreen;
