import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import COLOR from '../constants/Colors';
import getFontSize from '../helper/getFontSize';
import { getFontSizeByWindowWidth, calcHeight, calcWidth } from '../helper/res';

const AmountInput = ({ amount = '', handleInputChange, isTextInput = false }) => {
  const baseFontSize = getFontSizeByWindowWidth(50);
  const [fontSize,setFontSize] = useState(getFontSize("₹" + amount, calcWidth(70), baseFontSize));

  const commonStyles = {
    fontSize: fontSize,
    lineHeight: fontSize * 1.2,
    paddingVertical: (baseFontSize * 1.2 - fontSize * 1.2) / 2
  };

  const handleChange = (newAmount) => {
    if (handleInputChange) {
      handleInputChange(newAmount);
    }
    setFontSize(getFontSize("₹" + newAmount, calcWidth(70), baseFontSize));
  };

  return (
    <View style={{ ...styles.rowCentered, margin: calcHeight(1), marginHorizontal: calcWidth(20) }}>
      <Text style={[styles.amount, commonStyles]}>₹</Text>
      {isTextInput ? (
        <TextInput
          style={[styles.amount, commonStyles]}
          onChangeText={handleChange}
          value={amount}
          keyboardType="numeric"
          placeholderTextColor={COLOR.TEXT}
          placeholder="0"
          autoFocus
        />
      ) : (
        <Text style={[styles.amount, commonStyles]}>{amount}</Text>
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
    fontWeight: "bold"
  }
});
