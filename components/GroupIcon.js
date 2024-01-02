import { StyleSheet, View, Image } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
import LoginIcon from "../assets/Login.png";
import COLOR from '../constants/Colors';
function GroupIcon({ image, backgroundColor }) {
    return (
        <View
            style={[
                styles.imageContainer,
                backgroundColor ? { backgroundColor } : {},
            ]}
        >
            <Image source={image||LoginIcon} style={styles.image} resizeMode="contain" />
        </View>
    );
}

export default GroupIcon;

const styles = StyleSheet.create({
    image: {
        height: calcHeight(3),
        width: calcHeight(3),
    },
    imageContainer: {
        padding: calcWidth(2),
        borderRadius: calcHeight(10),
        backgroundColor: COLOR.BUTTON
    },
});
