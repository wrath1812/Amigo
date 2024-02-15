import { FAB } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import plusIconStyle from '../constants/plusIconStyle';
function FabIcon({ onPress, loading }) {
    if (loading)
        return (
            <View style={styles.fabContainer}>
                <FAB
                    style={[
                        styles.fab,
                        { backgroundColor: COLOR.SKELETON_MASK_COLOR },
                    ]}
                    customSize={calcHeight(9)}
                    color="white"
                />
            </View>
        );
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

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        bottom: calcHeight(5),
        right: calcWidth(6.5),
    },
    fab: plusIconStyle,
});
