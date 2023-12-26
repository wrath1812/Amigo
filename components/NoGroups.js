import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View, StyleSheet,Text,Image, Pressable } from 'react-native';
import NoGroupsImage from "../assets/NoGroups.png";
import {calcWidth,calcHeight,getFontSizeByWindowWidth} from "../helper/res";
import { AntDesign } from '@expo/vector-icons'; 
import COLOR from "../constants/Colors";
function NoGroups({onPress}) {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={NoGroupsImage} style={styles.image} resizeMode="contain" />
            <Pressable onPress={onPress}>
            <Text style={styles.text}>No Groups Yet</Text>
            </Pressable>
            <AntDesign name="pluscircle" size={calcHeight(5)} color={COLOR.BUTTON} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
      image: {
        height: calcWidth(70),
        aspectRatio: 1
      },
      text:{
        fontSize:getFontSizeByWindowWidth(15),
        color:COLOR.PRIMARY,
        fontWeight:"bold",
        marginBottom:calcHeight(3)
      }
});

export default NoGroups;
