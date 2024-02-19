import React from 'react'
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { calcWidth, calcHeight, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';

function BalanceArrow({totalBalance}) {
  return (
    <View
    style={[
        {
            padding: calcWidth(0.5),
            borderRadius: calcWidth(2),},
        {
            backgroundColor:
                totalBalance > 0 ? COLOR.BALANCE_POSITIVE_COLOR: COLOR.BALANCE_NEGATIVE_COLOR,
        },
    ]}
>
    <Feather
        name={
            totalBalance > 0
                ? 'arrow-up-right'
                : 'arrow-down-right'
        }
        size={calcWidth(2)}
        color="white"
    />
</View>
  )
}

export default BalanceArrow;
