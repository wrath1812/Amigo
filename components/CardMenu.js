import React from 'react';
import { Alert,View, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { calcWidth, calcHeight } from '../helper/res';
import Modal from 'react-native-modal';

const CardMenu = ({
    copyCardNumberToClipboard,
    setShowEditCard,
    setShowConfirmDelete,
    visible,
    hideMenu,
    onCancel,
    onDelete,
}) => {
    const deleteAlert = () => {
        Alert.alert(
            'Delete Card',
            'Are you sure you want to delete this card?',
            [
                {
                    text: 'Delete',
                    onPress: onDelete,
                    style: 'destructive',
                },
                {
                    text: 'Cancel',
                    onPress: onCancel,
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };
    return (
        <Modal
            isVisible={visible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.5}
            onBackdropPress={hideMenu}
            onBackButtonPress={hideMenu}
            propagateSwipe={true}
            swipeDirection={['down']}
            onSwipeComplete={hideMenu}
            style={styles.modal}
        >
            <View style={styles.modalContent}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={copyCardNumberToClipboard}
                >
                    <Ionicons
                        name="copy-outline"
                        size={calcWidth(8)}
                        color="blue"
                    />
                    <Text style={styles.menuText}>Copy Card Number</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={setShowEditCard}
                >
                    <Ionicons
                        name="create-outline"
                        size={calcWidth(8)}
                        color="blue"
                    />
                    <Text style={styles.menuText}>Edit Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={deleteAlert}
                >
                    <Ionicons
                        name="trash-outline"
                        size={calcWidth(8)}
                        color="red"
                    />
                    <Text style={styles.menuText}>Delete Card</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = {
    menuItem: {
        flexDirection: 'row',
        paddingVertical: calcHeight(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuText: {
        fontSize: calcHeight(2),
        paddingHorizontal: calcHeight(1),
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
};

export default CardMenu;
