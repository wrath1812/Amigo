import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList,Alert } from 'react-native';
import { calcHeight } from '../helper/res';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { getFontSizeByWindowWidth } from '../helper/res';
import Cards from '../components/card';


function Settings() {
  const [modalVisible, setModalVisible] = useState(false);
  const { cards } = useAuth();
  const [selectedIndices, setSelectedIndices] = useState([]);

  const exportCards = () => {
    if (selectedIndices.length === 0) {
      alert('No cards selected');
      return;
    }
    const selectedCards = selectedIndices.map((index) => cards[index]);
    console.log(selectedCards);
    const exportableComponent = <Cards cards={selectedCards[0]} />;
  
  }
  
 
  const handleExport = () => {
    if (cards.length === 0) {
      alert('No cards to export');
      return;
    }
    setModalVisible(true);
  };

  const toggleCardSelection = (index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.option} onPress={handleExport}>
        <Text style={styles.optionText}>Export</Text>
        <AntDesign name="upload" size={calcHeight(3)} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Import</Text>
        <AntDesign name="download" size={calcHeight(3)} color="black" />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
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
        </View>
      </Modal>
    </View>
  );
}

const styles = {
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: calcHeight(2),
    backgroundColor: '#fff',
    margin: calcHeight(1),
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
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
  }
};

export default Settings;
