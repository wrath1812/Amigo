import { StyleSheet, View, Pressable, Text } from 'react-native';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import { Octicons, EvilIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import PAGES from '../constants/pages';
function convertToCustomFormat(dateString) {
    // Parse the date string
    var date = new Date(dateString);

    // Define options for toLocaleDateString
    var options = { day: 'numeric', month: 'long' };

    // Convert to desired format
    return date.toLocaleDateString('en-IN', options);
}

function TransactionCard({ transaction }) {
    const navigation = useNavigation();
    const { user } = useAuth();
    return (
        <View
            style={{
                ...styles.transactionContainer,
                alignItems:
                    user._id == transaction.creator._id
                        ? 'flex-end'
                        : 'flex-start',
            }}
        >
            <Pressable
                key={transaction._id}
                style={styles.transactionCard}
                onPress={() =>
                    navigation.navigate(PAGES.TRANSACTION_DETAIL, {
                        transaction: transaction,
                    })
                }
            >
                <View style={styles.header}>
                    <Octicons
                        name="person"
                        size={calcHeight(2)}
                        color="white"
                    />
                    <Text style={styles.participants}>
                        {transaction.splitAmong?.length} Participants
                    </Text>
                </View>
                <View style={styles.flexContainer}>
                    <Text style={styles.amount}>$</Text>
                    <View>
                        <Text style={styles.amount}>{transaction.amount}</Text>
                        <Text style={styles.description}>
                            {transaction.description}
                        </Text>
                    </View>
                </View>
                <View style={[styles.header, { marginTop: calcHeight(3) }]}>
                    <EvilIcons
                        name="calendar"
                        size={calcHeight(2)}
                        color="white"
                    />

                    <View style={styles.header}>
                        <Text style={styles.description}>
                            {convertToCustomFormat(transaction.date)}
                        </Text>
                    </View>
                    <Text style={styles.description}>
                        Created By{' '}
                        {user._id == transaction.creator._id
                            ? 'You'
                            : transaction.creator.name}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

export default TransactionCard;

const styles = StyleSheet.create({
    transactionContainer: {
        flex: 1,
    },
    transactionCard: {
        padding: calcWidth(5),
        width: calcWidth(70),
        borderRadius: calcHeight(1),
        backgroundColor: '#342F4F',
        margin: calcWidth(5),
    },
    description: {
        fontSize: getFontSizeByWindowWidth(10),
        color: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    participants: {
        color: 'white',
        marginLeft: calcWidth(5),
    },
    amount: {
        fontSize: getFontSizeByWindowWidth(20),
        color: COLOR.TEXT,
        fontWeight: 'bold',
        marginRight: calcWidth(2),
    },
    flexContainer: {
        flexDirection: 'row',
        marginTop: calcHeight(3),
    },
});
