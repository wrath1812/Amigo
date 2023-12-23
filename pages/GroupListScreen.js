import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Pressable,
} from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
import Loader from '../components/Loader';
import apiHelper from '../helper/apiHelper';
import PAGES from '../constants/pages';
import FabIcon from '../components/FabIcon';

function GroupListScreen({ navigation }) {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data } = await apiHelper('/group');
            setGroups(data);
            setLoading(false);
        })();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {groups.map((group) => (
                    <Pressable
                        onPress={() => {
                            navigation.navigate(PAGES.TRANSACTION, { group });
                        }}
                    >
                        <Text key={group._id} style={styles.groupName}>
                            {group.name}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
            <FabIcon onPress={() => navigation.navigate(PAGES.ADD_GROUP)} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    groupName: {
        fontSize: 16,
        marginVertical: 5, // Add margin for better spacing
    },
    // ... other styles
});

export default GroupListScreen;
