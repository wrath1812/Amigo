import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Modal, Pressable } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import { calcHeight } from '../helper/res';

const DatePickerSelector = ({ range, setRange }) => {
  const [open, setOpen] = useState(false);
  const [showModalVisible, setCustomModalVisible] = useState(false); // New state for custom date modal

  const onDismiss = () => {
    setOpen(false);
  };

  const onConfirm = ({ startDate, endDate }) => {
    setOpen(false);
    setRange({ startDate, endDate });
  };

  const showCustomDateModal = () => {
    setCustomModalVisible(true);
  };

  const hideCustomDateModal = () => {
    setCustomModalVisible(false);
  };

  const setCustomDateRange = (customStartDate, customEndDate) => {
    setRange({ startDate: customStartDate, endDate: customEndDate });
    hideCustomDateModal();
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: '#342F4F',
          padding: 10,
          flexDirection: 'row',
          borderRadius: 10,
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalVisible} // Show the custom date modal
        onRequestClose={hideCustomDateModal}
      >
        {/* Your custom date range modal content here */}
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: calcHeight(4),
              backgroundColor: COLOR.APP_BACKGROUND,
              paddingBottom: calcHeight(7),
            }}
          >
            <TouchableOpacity onPress={showCustomDateModal}> {/* Open the custom date modal */}
              <Text>Custom Dates</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRange(/* Set this week date range logic here */)}>
              <Text>This Week</Text>
            </TouchableOpacity>
            <Text>This Month</Text>
            <Text>All Transactions</Text>
          </View>
        </Pressable>
      </Modal>

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
