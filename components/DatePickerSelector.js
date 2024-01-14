import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';

const DatePickerSelector = ({ range, setRange, open, setOpen }) => {
    const onDismiss = () => {
        setOpen(false);
    };

    const onConfirm = ({ startDate, endDate }) => {
        setOpen(false);
        setRange({ startDate, endDate });
    };

    return (
        <View>
            <TouchableOpacity
                style={{
                    backgroundColor: '#342F4F',
                    padding: 10,
                    flexDirection: 'row',
                }}
                onPress={() => setOpen(true)}
            >
                <Text
                    style={{
                        fontSize: getFontSizeByWindowWidth(15),
                        color: COLOR.TEXT,
                    }}
                >
                    Date
                </Text>
            </TouchableOpacity>

            <DatePickerModal
                locale="en"
                mode="range"
                visible={open}
                onDismiss={onDismiss}
                startDate={range.startDate}
                endDate={range.endDate}
                onConfirm={onConfirm}
            />
        </View>
    );
};

export default DatePickerSelector;
