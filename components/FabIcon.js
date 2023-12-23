import { FAB } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
function FabIcon({ onPress }) {
    return (
        <View style={styles.fabContainer}>
            <FAB icon="plus" onPress={onPress} />
        </View>
    );
}

export default FabIcon;

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        bottom: calcHeight(5),
        right: calcWidth(5),
    },
});
