import React, { useState, useEffect, useRef } from 'react';
import { View,ScrollView, Text, SafeAreaView,TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import COLOR from '../constants/Colors';
import ContactCard from '../components/ContactCard';
import Button from '../components/Button';
import { calcHeight, calcWidth } from '../helper/res';
import Toast from 'react-native-root-toast';
import Loader from "../components/Loader";
import apiHelper from "../helper/apiHelper";
import PAGES from "../constants/pages";
import generateRandomColor from '../helper/generateRandomColor';

const CreateGroup = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [groupName, setGroupName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const searchRef=useRef();
  const nameRef=useRef();
  const [isLoading,setIsLoading]=useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });
  
        if (data.length > 0) {
          const seenPhoneNumbers = new Set();
          const uniqueContacts = data.filter(contact => {
            if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
              const phoneNumber = contact.phoneNumbers[0].number.replace(/\D/g, '');
              if (!seenPhoneNumbers.has(phoneNumber)) {
                seenPhoneNumbers.add(phoneNumber);
                return true;
              }
            }
            return false;
          });
  
          const simplifiedContacts = uniqueContacts.map((contact) => {
            return {
              id: contact.id,
              name: contact.name || '',
              phoneNumber: contact.phoneNumbers[0].number.replace(/\D/g, ''),
              imageURI: contact.imageAvailable ? contact.image.uri : '',
              color: generateRandomColor()
            };
          });
  
          setContacts(simplifiedContacts);
        }
      }
    })();
  }, []);
  

  const createGroupAsync =async()=>{
    setIsLoading(true);
    const phoneNumbers=selectedContacts.map(({phoneNumber})=>({phoneNumber,countryCode:"91"}));
    await apiHelper.post('/group', { name:groupName,phoneNumbers });
    navigation.navigate(PAGES.GROUP_LIST);
};

  const handleSelectContact = (contact) => {
    if (selectedContacts.some((selected) => selected.id === contact.id)) {
      setSelectedContacts(selectedContacts.filter((selected) => selected.id !== contact.id));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const filterContacts = () => {
    if (search === '') {
      return contacts;
    }
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.phoneNumber.includes(search)
    );
  };


  return isLoading?<Loader/>:(
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.heading}>New group</Text>
      <Pressable style={styles.inputContainer} 
      onPress={()=>nameRef.current.focus()}
      >
        <TextInput
          style={styles.input}
          onChangeText={setGroupName}
          value={groupName}
          placeholder="Name your group"
          placeholderTextColor="gray"
          ref={nameRef}
        />
      </Pressable>
      <View style={styles.title}>
        <Text style={styles.titleText}>Add members</Text>
      </View>
      <Pressable style={styles.inputContainer} 
      onPress={()=>searchRef.current.focus()}
      >
        <FontAwesome name="search" size={24} color="gray" />
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Search"
          placeholderTextColor="gray"
          ref={searchRef}
        />
      </Pressable>
      <FlatList
        data={filterContacts()}
        style={{
          height:calcHeight(40)
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleSelectContact(item)}>
            <ContactCard
              {...item}
              selected={selectedContacts.some((selected) => selected.id === item.id)}
            />
          </Pressable>
        )}
      />
<View style={styles.button}>
        <Button title="Create Group" onPress={
    selectedContacts.length==0 || groupName==""?  ()=>    {
      Toast.show("Select a contact",{duration: Toast.durations.LONG})
          }:createGroupAsync
        } 
        styleOverwrite={selectedContacts.length==0 || groupName==""?{opacity:0.57}:{}}
        />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.APP_BACKGROUND,
  },
  scroll:{
    margin:calcWidth(5)
  },
  heading: {
    color: COLOR.PRIMARY,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color:"white"
  },
  title: {
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  titleText: {
    color: COLOR.PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    alignContent:"center"
  },
});

export default CreateGroup;
