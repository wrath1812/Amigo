import { calcWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function CheckBox({ selected }) {
    return selected?<Ionicons name="checkmark-circle-sharp" size={calcWidth(7)} color={COLOR.BUTTON} />
    :<MaterialCommunityIcons name="checkbox-blank-circle-outline" size={calcWidth(7)} color="white" />;
}

export default CheckBox;

