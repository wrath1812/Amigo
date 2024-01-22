import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Modal, Pressable } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import { calcHeight } from '../helper/res';

const getStartOfWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - now.getDay());
    return startOfWeek;
};

const styles = {
    buttonContainer: {
        backgroundColor: '#342F4F',
        padding: 10,
        flexDirection: 'row',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: getFontSizeByWindowWidth(15),
        color: COLOR.TEXT,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: calcHeight(4),
        backgroundColor: 'white',
        paddingBottom: calcHeight(7),
    },
};

const buttonOptions = {
    customDates: 'Custom Dates',
    thisWeek: 'This Week',
};

const DatePickerSelector = ({ range, setRange }) => {
    const [modalState, setModalState] = useState(null);

    const onDismiss = () => {
        setModalState(null);
    };

    const onConfirm = ({ startDate, endDate }) => {
        setModalState(null);
        setRange({ startDate, endDate });
    };

    const showCustomDateModal = () => {
        setModalState('datePicker');
    };

    const renderButtons = () => (
        <>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => setModalState('model')}
            >
                <Text style={styles.buttonText}>Date</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalState === 'model'}
                onRequestClose={() => {
                    setModalState(null);
                }}
            >
                <Pressable
                    style={styles.modalContent}
                    onPress={() => setModalState(null)}
                >
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={showCustomDateModal}>
                            <Text>{buttonOptions.customDates}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                onConfirm({
                                    startDate: getStartOfWeek(),
                                    endDate: new Date(),
                                })
                            }
                        >
                            <Text>{buttonOptions.thisWeek}</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>

            <DatePickerModal
                locale="en"
                mode="range"
                visible={modalState === 'datePicker'}
                onDismiss={onDismiss}
                startDate={range.startDate}
                endDate={range.endDate}
                onConfirm={onConfirm}
            />
        </>
    );

    return <View>{renderButtons()}</View>;
};

export default DatePickerSelector;
