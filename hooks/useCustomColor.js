import { useAuth } from '../context/AuthContext';
import COLOR from '../constants/Colors';
import getAvatarColor from '../constants/getAvatarColor';
function useCustomColor() {
    const { user } = useAuth();

    const generateColor = (id) => {
        return id === user._id ? COLOR.BUTTON : getAvatarColor(id);
    };

    return generateColor;
}

export default useCustomColor;
