import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

function DeleteCardModal({ onDelete, onCancel }) {
    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text>Are you sure you want to delete this card?</Text>
                <TouchableOpacity onPress={onDelete}>
                    <Text>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onCancel}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default DeleteCardModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    }
});