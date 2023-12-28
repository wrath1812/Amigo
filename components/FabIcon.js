import { FAB } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
import COLOR from '../constants/Colors';
function FabIcon({ onPress }) {
    return (
        <View style={styles.fabContainer}>
            <FAB
                style={styles.fab}
                icon="plus"
                customSize={calcHeight(9)}
                onPress={onPress}
                color="white"
            />
        </View>
    );
}

export default FabIcon;
const fabSize = 7;
const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        bottom: calcHeight(5),
        right: calcWidth(6.5),
    },
    fab: {
        backgroundColor: COLOR.BUTTON,
        // Increase the size of the FAB
        height: calcHeight(fabSize), // Default is usually 56, increase this value
        width: calcHeight(fabSize), // Default is usually 56, increase this value
        borderRadius: calcHeight(fabSize), // Adjust the border radius if needed (half of width/height for perfect circle)
        alignItems: 'center',
        justifyContent: 'center',
    },
});
