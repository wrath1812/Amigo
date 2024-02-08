import React from 'react';
import { View, Text, TextInput,StyleSheet } from 'react-native';
import COLOR from '../constants/Colors';
import { getFontSizeByWindowWidth,calcHeight,calcWidth } from '../helper/res';
const AmountInput = ({ amount, handleInputChange, isTextInput }) => {
  return (
    <View style={{ ...styles.rowCentered, margin: calcHeight(1), marginHorizontal: calcWidth(20) }}>
      <Text style={styles.amount}>₹</Text>
      {isTextInput ? (
        <TextInput
          style={styles.amount}
          onChangeText={handleInputChange}
          value={amount}
          keyboardType="numeric"
          placeholderTextColor={COLOR.TEXT}
          placeholder="0"
          autoFocus
        />
      ) : (
        <Text style={styles.amount}>{amount}</Text>
      )}
    </View>
  );
};

export default AmountInput;

const styles = StyleSheet.create({
    rowCentered: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    amount: {
        color: COLOR.TEXT,
        fontSize: getFontSizeByWindowWidth(50),
        lineHeight:calcHeight(8),
        fontWeight:"bold"
    }
});
