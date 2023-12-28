import React, { useCallback, useState } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Pressable,
    View,
    TextInput,
} from 'react-native';
import Loader from '../components/Loader';
import apiHelper from '../helper/apiHelper';
import PAGES from '../constants/pages';
import FabIcon from '../components/FabIcon';
import { useFocusEffect } from '@react-navigation/native';
import copyToClipBoard from '../helper/copyToClipBoard';
import { Feather } from '@expo/vector-icons';
import EmptyScreen from '../components/EmptyScreen';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import { useRef } from 'react';
import GroupCard from '../components/GroupCard';
import NoGroupsImage from '../assets/NoGroups.png';
import { useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Search from '../components/Search';

function GroupListScreen({ navigation }) {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            // Show the tab bar when this screen is focused
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'flex' },
            });
        } else {
            // Optional: Hide the tab bar when this screen is not focused
            // You can remove this part if you only want to show the tab bar in this screen
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'none' },
            });
        }
    }, [isFocused, navigation]);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                setLoading(true);
                console.log(groups.members);
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
            <Text style={styles.header}>Groups</Text>
            {groups.length == 0 ? (
                <EmptyScreen
                    onPress={() => {
                        navigation.navigate(PAGES.CREATE_GROUP);
                    }}
                    image={NoGroupsImage}
                    title="No Groups Yet"
                />
            ) : (
                <View>
                    <Search search={search} setSearch={setSearch} />
                    <ScrollView>
                        {groups.map((group) => (
                            <GroupCard group={group} />
                        ))}
                    </ScrollView>
                </View>
            )}
            {groups.length != 0 && (
                <FabIcon
                    onPress={() => {
                        {
                            navigation.navigate(PAGES.CREATE_GROUP);
                        }
                    }}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
    },
    header: {
        fontSize: getFontSizeByWindowWidth(19),
        color: COLOR.TEXT,
        fontWeight: 'bold',
        alignContent: 'left',
        padding: calcWidth(3),
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
