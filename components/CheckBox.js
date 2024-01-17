import { FAB } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome,Ionicons } from '@expo/vector-icons';

function CheckBox({ selected }) {
    return selected?<Ionicons name="checkmark-circle-sharp" size={calcWidth(7)} color={COLOR.BUTTON} />
    :<MaterialCommunityIcons name="checkbox-blank-circle-outline" size={calcWidth(7)} color="white" />;
}

export default CheckBox;

