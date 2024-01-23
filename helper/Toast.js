import Toast from 'react-native-root-toast';

function showToast(message) {
    Toast.show(message, {
        duration: Toast.durations.LONG,
    });
}

export default showToast;
