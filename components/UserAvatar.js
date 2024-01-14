import { StyleSheet, View, Text } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import uuidToColor from '../helper/uuidToColor';
function UserAvar({ user: { name, _id } }) {
    return (
        <View
            style={[
                styles.placeHolderView,
                { backgroundColor: uuidToColor(_id, COLOR.APP_BACKGROUND) },
            ]}
        >
            <Text>{name.charAt(0).toUpperCase()}</Text>
        </View>
    );
}

export default UserAvar;

const selectorSize = 5;

const styles = StyleSheet.create({
    placeHolderView: {
        height: calcHeight(selectorSize),
        width: calcHeight(selectorSize),
        borderRadius: calcHeight(selectorSize),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
