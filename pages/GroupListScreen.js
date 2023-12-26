import React, { useCallback, useState } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Pressable,
    View,
    TextInput
} from 'react-native';
import Loader from '../components/Loader';
import { FontAwesome } from '@expo/vector-icons';
import apiHelper from '../helper/apiHelper';
import PAGES from '../constants/pages';
import FabIcon from '../components/FabIcon';
import { useFocusEffect } from '@react-navigation/native';
import copyToClipBoard from '../helper/copyToClipBoard';
import { Feather } from '@expo/vector-icons';
import NoGroups from '../components/NoGroups';
import COLOR from '../constants/Colors';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import {useRef} from "react";

function GroupListScreen({ navigation }) {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search,setSearch]=useState("");
    const searchRef=useRef();
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
            {groups.length==0?<NoGroups onPress={()=>{navigation.navigate(PAGES.CREATE_GROUP)}}/>:(
            <View>
                
                <Pressable style={styles.inputContainer} 
      onPress={()=>searchRef.current.focus()}
      >
        <FontAwesome name="search" size={calcWidth(4)} color="gray" />
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Search"
          placeholderTextColor="gray"
          ref={searchRef}
        />
      </Pressable>
      <ScrollView>
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
                
            </ScrollView></View>)}
            {groups.length!=0 &&<FabIcon onPress={()=>{{
                navigation.navigate(PAGES.CREATE_GROUP)}}}/>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLOR.APP_BACKGROUND
    },
    header:{
        fontSize:getFontSizeByWindowWidth(19),
        color:COLOR.TEXT,
        fontWeight:"bold",
        alignContent:"left",
        padding:calcWidth(3)
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
        padding: calcWidth(2),
        borderWidth: 1,
        borderColor: COLOR.BUTTON,
        borderRadius: calcWidth(2),
        margin: calcHeight(2),
      },
      input: {
        flex: 1,
        marginLeft: 10,
        color:"white"
      }
});

export default GroupListScreen;
