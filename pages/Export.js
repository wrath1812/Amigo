import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FileSystem } from 'expo-file-system';
import { Sharing } from 'expo-sharing';
import { getFontSizeByWindowWidth,calcHeight } from '../helper/res';

function Export({ cards, closeModal, selectedIndices }) {
  const exportCards = async () => {
    if (selectedIndices.length === 0) {
      alert('No cards selected');
      return;
    }
    const selectedCards = selectedIndices.map((index) => cards[index]);
    const fileUri = FileSystem.documentDirectory + 'cardVault_export.json';
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(selectedCards));

    const saveFile = async (uri, filename, mimetype) => {
      if (Platform.OS === 'android') {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
          await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
            })
            .catch(e => console.log(e));
        } else {
          Sharing.shareAsync(uri);
        }
      } else {
        Sharing.shareAsync(uri);
      }
    };

    await saveFile(fileUri, 'cardVault_export.json', 'application/json');
    closeModal();
  };

  const toggleCardSelection = (index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  return (
    <View>
      <Text style={styles.modalTitle}>Select Cards to Export</Text>
      <FlatList
        data={cards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.cardItem,
              {
                backgroundColor: selectedIndices.includes(index) ? 'lightgreen' : 'white',
              },
            ]}
            onPress={() => toggleCardSelection(index)}
          >
            <MaterialIcons
              name={
                selectedIndices.includes(index) ? 'check-box' : 'check-box-outline-blank'
              }
              size={30}
              color={selectedIndices.includes(index) ? 'green' : 'lightgray'}
            />
            <Text>{item.nickname}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.modalOptions}>
        <TouchableOpacity style={styles.closeButton} onPress={exportCards}>
          <Text>Export</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  cardItem: {
    flexDirection: 'row',
    fontSize: getFontSizeByWindowWidth(20),
    margin: calcHeight(3),
    textAlign: 'center',
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  modalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: calcHeight(1),
  },
};

export default Export;
