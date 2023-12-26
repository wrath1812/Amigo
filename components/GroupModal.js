import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { getFontSizeByWindowWidth, calcHeight, calcWidth } from "../helper/res";
import Modal from "react-native-modal";
import * as Contacts from "expo-contacts";
import COLOR from "../constants/Colors";
import ContactCard from "./ContactCard";
import { FontAwesome } from '@expo/vector-icons'; 

function generateRandomColor() {
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 16).toString(16);
    }
    return color;
}
const GroupModal = ({ visible, hideModal }) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });
        if (data.length > 0) {
          const simplifiedContacts = data.map(contact => ({
            name: contact.name||"",
            phoneNumber: contact.phoneNumbers ? contact.phoneNumbers[0].number : '',
            imageURI: contact.imageAvailable ? contact.image.uri : ''
          }));
          setContacts(simplifiedContacts);
        }
      }
    })();
  }, []);
  
  const filterContacts = () => {
    if (search === "") {
      return contacts;
    }
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.phoneNumber.includes(search)
    );
};

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      propagateSwipe={true}
      swipeDirection={["down"]}
      onSwipeComplete={hideModal}
      style={styles.modal}
    >
        <Text style={styles.heading}>New group</Text>
        <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setGroupName}
        value={groupName}
        placeholder="Name your group"
        placeholderTextColor={"gray"}
      />
    </View>
    <View style={styles.title}>
    <Text style={styles.title}>Add members</Text>
    </View>
    <View style={styles.inputContainer}>
    <FontAwesome name="search" size={calcWidth(4)} color="gray"
    style={{
        marginLeft:calcWidth(2)
    }}
     />
      <TextInput
        style={styles.input}
        onChangeText={setSearch}
        value={search}
        placeholder="Search"
        placeholderTextColor={"gray"}
      />
    </View>
    <FlatList
        data={filterContacts()}
        keyExtractor={(item) => item.phoneNumber.toString()}
        renderItem={({item})=>{
        return(<ContactCard {...item} color={generateRandomColor()}/>)}}
      />

    </Modal>
  );
};

const styles = StyleSheet.create({
    modal:{
        backgroundColor:COLOR.APP_BACKGROUND,
        justifyContent: 'flex-end',
    margin: 0,
    marginTop:calcHeight(15),
    flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    heading:{
        color:COLOR.PRIMARY,
        marginTop:calcHeight(10),
        fontSize:getFontSizeByWindowWidth(15),
        color:COLOR.PRIMARY,
        fontWeight:"bold",
        marginBottom:calcHeight(3)
    },
    inputContainer:{
        height: calcHeight(5),
        width:calcWidth(80),
        borderRadius:calcWidth(2),
        borderWidth: 1,
        borderColor: 'gray', // Add more styling as needed,
        flexDirection:"row",
        alignItems:"center"
    },
      input: {
        paddingLeft: calcWidth(2),
        color:COLOR.TEXT
      },
      title:{
        color:COLOR.PRIMARY,
        marginTop:calcHeight(2),
        fontSize:getFontSizeByWindowWidth(12),
        color:COLOR.PRIMARY,
        margin:calcHeight(2.5),
        alignSelf:"flex-start"
      }
});

export default GroupModal;
