import { StyleSheet, View,Image } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
import COLOR from '../constants/Colors';
function GroupIcon({ image }) {
    return (
        <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} resizeMode="contain" />
            </View>
    );
}

export default GroupIcon;

const styles = StyleSheet.create({
    image: {
        height:calcHeight(4),
        width:calcHeight(4)
    },
    imageContainer:{
        padding:calcWidth(2),
        borderRadius:calcHeight(10),
        backgroundColor:COLOR.BUTTON
    }
});
