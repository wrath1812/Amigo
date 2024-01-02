import { StyleSheet, View, Pressable, Text } from 'react-native';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import { Octicons, EvilIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import PAGES from '../constants/pages';
import GroupIcon from "./GroupIcon";
function convertToCustomFormat(dateString) {
    // Parse the date string
    var date = new Date(dateString);

    // Define options for toLocaleDateString
    var options = { day: 'numeric', month: 'long' };

    // Convert to desired format
    return date.toLocaleDateString('en-IN', options);
}

function Feed({ creator,createdAt,relatedId,activityType}) {
    const navigation = useNavigation();
    const { user } = useAuth();

    const renderActivity = (  ) => {
        if (activityType === 'transaction') {
            return <Pressable
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
                    {relatedId.splitAmong?.length} Participants
                </Text>
            </View>
            <View style={styles.flexContainer}>
                <Text style={styles.amount}>$</Text>
                <View>
                    <Text style={styles.amount}>{relatedId.amount}</Text>
                    <Text style={styles.description}>
                        {relatedId.description}
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
                        {convertToCustomFormat(relatedId.date)}
                    </Text>
                </View>
                <Text style={styles.description}>
                    Created By{' '}
                    {user._id == relatedId.creator._id
                        ? 'You'
                        : relatedId.creator.name}
                </Text>
            </View>
        </Pressable>;
        } else if (activityType === 'payment') {
            return (
                <View>
                <Text style={styles.payer}>
                    {relatedId.payer.name} paid {relatedId.receiver.name}
                </Text>
                <Text style={styles.amount}>${relatedId.amount}</Text>
                <Text style={styles.createdAt}>{createdAt}</Text>
            </View>
            );
        }
        else if (activityType === 'chat'){
            return (
            <View>
            <Text style={styles.payer}>
                {creator.name}
            </Text>
            <Text style={styles.amount}>{relatedId.message}</Text>
            <Text style={styles.createdAt}>{JSON.stringify(createdAt)}</Text>
        </View>);
        }
    };
    return (
        <View
        style={[
            {
                ...styles.transactionContainer,
                alignItems: user._id === creator._id ? 'flex-end' : 'flex-start',
            }
        ]}
        
        >
            <View
                style={[
                    styles.transactionCard,
                    {
                        backgroundColor: user._id === creator._id ? COLOR.BUTTON : '#342F4F',
                        ...(user._id === creator._id
                            ? { borderTopLeftRadius: calcHeight(1) }
                            : { borderTopRightRadius: calcHeight(1) }
                        )
                    }
                ]}
                
               
            >
                {renderActivity()}
            </View> 
        </View>
    );
}

export default Feed;

const styles = StyleSheet.create({
    transactionContainer: {
        flex: 1,
    },
    transactionCard: {
        padding: calcWidth(5),
  width: calcWidth(70),
  // Define each corner's radius separately to achieve the desired shape
  borderBottomLeftRadius: calcHeight(1),
  borderBottomRightRadius: calcHeight(1),
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
