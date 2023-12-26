import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { getFontSizeByWindowWidth, calcHeight, calcWidth } from "../helper/res";
import Modal from "react-native-modal";
import * as Contacts from "expo-contacts";
import COLOR from "../constants/Colors";
import ContactCard from "./ContactCard";
const GroupModal = ({ visible, hideModal }) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });
        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Entypo name="circle-with-plus" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );

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
        <ContactCard
        selected={true} name={"fefr"} phoneNumber={"+4342423232323"}
        />
      <View style={styles.modalContent}>
        <View style={styles.menuHeader}>
          <TouchableOpacity onPress={hideModal}>
            <Entypo name="chevron-thin-down" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.menuTitle}>New group</Text>
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name your group"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#666"
          onChangeText={setSearch}
          value={search}
        />
        <FlatList
          data={contacts.filter(contact => 
            contact.name.toLowerCase().includes(search.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderContactItem}
          ListFooterComponent={<View style={{ marginBottom: calcHeight(4) }} />} // Add spacing at the bottom
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modal:{
        backgroundColor:COLOR.APP_BACKGROUND
    },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: calcHeight(1),
    borderBottomWidth: 1,
    borderBottomColor: '#e7e6ea',
  },
  contactName: {
    fontSize: getFontSizeByWindowWidth(14),
    flex: 1, // Make name take up the available space
    marginLeft: calcWidth(3),
  },
  addButton: {
    marginRight: calcWidth(3),
  },
  avatar: {
    width: calcHeight(3),
    height: calcHeight(3),
    borderRadius: calcHeight(1.5),
  },
  // Add the rest of your styles here
});

export default GroupModal;
