import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import React, { useState } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather'; // Make sure to install the Feather icons library

const DatePicker = ({ date, setDate }) => {
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePickerContainer}
        >
            <View style={styles.calendarIcon}>
                <Icon name="calendar" size={20} color="#007AFF" />
            </View>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                    maximumDate={new Date()}
                    style={{
                        width: calcHeight(10),
                    }}
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: calcHeight(3),
        backgroundColor: 'white',
        borderRadius: 10,
    },
    calendarIcon: {
        padding: calcWidth(1),
    },
    dateText: {
        fontSize: getFontSizeByWindowWidth(12),
    },
});

export default DatePicker;
