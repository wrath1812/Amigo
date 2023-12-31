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
import { useFocusEffect } from '@react-navigation/native';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import Search from '../components/Search';
import GroupSelectCard from '../components/GroupSelectCard';
import { useTransaction } from '../context/TransactionContext';
import GroupIcon from '../components/GroupIcon';
import CreateGroupIcon from "../assets/icons/createGroup.png"

function GroupListScreen({ navigation }) {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const { setTransactionData } = useTransaction();

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
            <View
                style={{
                    marginVertical: calcHeight(2),
                }}
            >
                <Search search={search} setSearch={setSearch} />
            </View>
            <ScrollView>
                <GroupSelectCard
                    name={'Create new group'}
                    image={
                        <GroupIcon backgroundColor="white" image={CreateGroupIcon} />
                    }
                />
                {groups.map((group) => (
                    <GroupSelectCard
                        name={group.name}
                        onPress={() => {
                            setTransactionData((prev) => ({ ...prev, group }));
                            navigation.navigate(PAGES.ADD_TRANSACTION);
                        }}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.APP_BACKGROUND,
        alignItems: 'center',
    },
    header: {
        fontSize: getFontSizeByWindowWidth(19),
        color: COLOR.TEXT,
        fontWeight: 'bold',
        padding: calcWidth(3),
        margin: calcHeight(2),
    },
    groupName: {
        fontSize: 16,
        marginVertical: 5, // Add margin for better spacing
    },
    group: {
        flexDirection: 'row',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: calcWidth(5),
        borderWidth: 1,
        borderColor: COLOR.BUTTON,
        borderRadius: 10,
        margin: calcHeight(2),
        marginBottom: calcHeight(5),
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
    },
});

export default GroupListScreen;
