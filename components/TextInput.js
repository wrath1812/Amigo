import { FAB } from 'react-native-paper';
import { StyleSheet, Pressable,TextInput as DefaultInput } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';

import { useRef } from 'react';
function TextInput(propsOverwrite) {
    const textRef=useRef();
    return (
        <Pressable
        style={styles.container}
        onPress={() => textRef.current.focus()}
    >
        <DefaultInput
            style={styles.input}
            placeholderTextColor="#ccc"
            ref={textRef}
            textAlign='center'
            {
                ...propsOverwrite
            }
        />
    </Pressable>
    );
}

export default TextInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'white',
    },
    input: {
        flexDirection: 'row',
        padding: calcWidth(3),
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: calcWidth(30),
    }
});
