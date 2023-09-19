import React from 'react';
import { View,  FlatList} from 'react-native';
import cardData from '../data';
import Card from '../components/card';

function CardList() {

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cardData}
        renderItem={Card}
        keyExtractor={(item) => item.card_number}
      />
    </View>
  );
}



export default CardList;
