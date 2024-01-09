import { useAuth } from '../context/AuthContext';
import uuidToColor from '../helper/uuidToColor';
import COLOR from '../constants/Colors';
function useCustomColor() {
    const { user } = useAuth();

    const generateColor = (id) => {
        return id === user._id ? COLOR.BUTTON : uuidToColor(id, COLOR.BUTTON);
    };

    return generateColor;
}

export default useCustomColor;
