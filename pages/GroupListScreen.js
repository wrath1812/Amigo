import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
import Loader from "../components/Loader";
import apiHelper from "../helper/apiHelper";

function GroupListScreen({ navigation }) {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await apiHelper("/group");
            setGroups(data);
        })()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {groups.map(group => (
                    <Pressable onPress={()=>{
                        console.log(group._id);
                    }}>
                    <Text key={group._id} style={styles.groupName}>
                        {group.name}
                    </Text>
                    </Pressable>
                ))}
            </ScrollView>
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
