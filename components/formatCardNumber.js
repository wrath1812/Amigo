import { View, Text, StyleSheet } from 'react-native';
import { calcWidth, calcHeight, getFontSizeByWindowWidth } from '../helper/res';

function formatCardNumber(cardNumber, showCard = true, maskColor = null) {
    if (!cardNumber) return null;
    const formattedNumber = cardNumber.replace(/\s/g, ''); // Remove spaces
    const numBoxes = Math.ceil(formattedNumber.length / 4); // Calculate the number of boxes needed
    const boxes = [];

    for (let i = 0; i < numBoxes; i++) {
        const start = i * 4;
        const end = start + 4;
        const box = formattedNumber.slice(start, end);
        boxes.push(
            <View
                key={i}
                style={{
                    ...styles.cardNumberBoxContainer,
                    marginLeft: i === 0 ? 0 : calcWidth(3),
                }}
            >
                {showCard || i >= numBoxes - 1 ? (
                    <Text style={styles.cardNumberBox}>{box}</Text>
                ) : (
                    <View
                        style={{
                            ...styles.cardMask,
                            backgroundColor: maskColor,
                        }}
                    ></View>
                )}
            </View>,
        );
    }

    return <View style={styles.cardNumberContainer}>{boxes}</View>;
}

const styles = StyleSheet.create({
    cardNumberBoxContainer: {
        alignItems: 'center',
    },
    cardNumberBox: {
        color: 'white',
        fontSize: getFontSizeByWindowWidth(12), // Dynamically calculate font size
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        width: calcWidth(10),
        textAlign: 'center',
    },
    cardMask: {
        width: calcWidth(10),
        height: calcHeight(2),
    },
    cardNumberContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default formatCardNumber;
