import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

function useKeyboardHeight() {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            ({ endCoordinates }) => {
                setKeyboardHeight(endCoordinates.height);
            },
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
            },
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return keyboardHeight;
}

export default useKeyboardHeight;
