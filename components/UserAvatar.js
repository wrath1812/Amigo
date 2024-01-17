import { StyleSheet, View, Text } from 'react-native';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import uuidToColor from '../helper/uuidToColor';
const selectorSize = 5;

function UserAvar({ user: { name, _id }, size = selectorSize }) {
    return (
        <View
            style={[
                {
                    height: calcHeight(size),
                    width: calcHeight(size),
                    borderRadius: calcHeight(size),
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                { backgroundColor: uuidToColor(_id, COLOR.APP_BACKGROUND) },
            ]}
        >
            <Text
                style={{
                    fontSize: getFontSizeByWindowWidth(size * 2.5),
                }}
            >
                {name.charAt(0).toUpperCase()}
            </Text>
        </View>
    );
}

export default UserAvar;
