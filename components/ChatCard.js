import { StyleSheet, View, Text } from 'react-native';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';

function ChatCard({ createdAt, creator, message }) {
    return (
        <View style={styles.transactionCard}>
            <Text style={styles.payer}>
                {creator.name}
            </Text>
            <Text style={styles.amount}>{message}</Text>
            <Text style={styles.createdAt}>{JSON.stringify(createdAt)}</Text>
        </View>
    );
}

export default ChatCard;

const styles = StyleSheet.create({
    transactionCard: {
        padding: calcWidth(5),
        width: calcWidth(80),
        borderRadius: calcHeight(1),
        backgroundColor: '#342F4F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    payer: {
        fontSize: getFontSizeByWindowWidth(14),
        color: 'white',
        marginBottom: calcHeight(1),
    },
    amount: {
        fontSize: getFontSizeByWindowWidth(24),
        color: COLOR.TEXT,
        fontWeight: 'bold',
        marginBottom: calcHeight(1),
    },
    createdAt: {
        fontSize: getFontSizeByWindowWidth(12),
        color: 'white',
        marginTop: calcHeight(2),
    },
});
