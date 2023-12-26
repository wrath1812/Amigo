import React from 'react';
import { StyleSheet, View, Text, Image , Pressable} from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { calcHeight, calcWidth,getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import LoginImage from "../assets/Login.png";
import { useNavigation } from '@react-navigation/native'
import PAGES from "../constants/pages";
function getMembersString(members) {
    let names = [];

    for (let i = 0; i < members.length; i++) {
        if (members[i].hasOwnProperty('name') && members[i].name) {
            // Split the name string by spaces and take the first part
            let namePart = members[i].name.split(' ')[0];
            names.push(namePart);
        }
    }

    return names.join(', ');
}


function GroupCard({ group }) {
    const navigation = useNavigation();
    return (
            <Pressable
                        onPress={() => {
                            navigation.navigate(PAGES.TRANSACTION, { group });
                        }}
                        style={styles.container}
                    >
                       <View style={styles.imageContainer}>
            <Image source={LoginImage} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.textContainer}>
                        <Text  style={styles.nameText}>
                            {group.name}
                        </Text>
                        <Text style={styles.memberText}>{getMembersString(group.members)}</Text>
                        </View>
                    </Pressable>
    );

}

export default GroupCard;

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: calcWidth(5),
        borderBottomColor: "rgba(255, 255, 255, 0.13)" ,    
        borderBottomWidth:1
    },
    image: {
        height:calcHeight(4),
        width:calcHeight(4)
    },
    imageContainer:{
        padding:calcWidth(2),
        borderRadius:calcHeight(10),
        backgroundColor:COLOR.BUTTON
    },
    textContainer: {
        width:calcWidth(60),
        marginLeft:calcWidth(5)
    },
    nameText: {
        color:COLOR.BUTTON,
        fontWeight:"bold",
        fontSize:getFontSizeByWindowWidth(15)
    },
    memberText: {
        fontSize: getFontSizeByWindowWidth(8),
        color: COLOR.PRIMARY,
        marginTop:calcHeight(0.5)
    },
    placeHolderView:{
        height:calcHeight(5),
        width:calcHeight(5),
        borderRadius:calcHeight(5),
        justifyContent:"center",
        alignItems:"center",
        marginRight:calcWidth(2)
    },
    selectorContainer:{
        right:calcWidth(5)
    }
});
