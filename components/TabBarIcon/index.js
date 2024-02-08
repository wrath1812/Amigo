import { FAB } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { calcHeight, calcWidth } from '../../helper/res';
import icon from './icon';
import COLOR from '../../constants/Colors';

function TabBarIcon({ tabBarProps, screen }) {
    return (
        <View style={styles.container}>
            {icon({ ...tabBarProps, screen })}
            {tabBarProps.focused && <View style={styles.focusedDot} />}
        </View>
    );
}
const dotSize = 0.5;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    focusedDot: {
        width: calcHeight(dotSize), // Size of the dot
        height: calcHeight(dotSize), // Size of the dot
        borderRadius: calcHeight(dotSize) / 2, // Half the width/height to make it a circle
        backgroundColor: COLOR.BUTTON, // Color of the dot
    },
});

export default TabBarIcon;
