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

function GroupListScreen({ navigation }) {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
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
            <Text>Groups</Text>
            {groups.length==0?<NoGroups onPress={()=>{navigation.navigate(PAGES.CREATE_GROUP)}}/>:(<ScrollView>
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
            {groups.length!=0 &&<FabIcon onPress={()=>{{
                navigation.navigate(PAGES.CREATE_GROUP)}}}/>}
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
