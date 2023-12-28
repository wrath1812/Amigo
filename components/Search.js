import { StyleSheet, View,Pressable,TextInput } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
import COLOR from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import {useRef} from "react"
function Search({ search,setSearch}) {
    const searchRef = useRef();
    return (
        <Pressable
        style={styles.inputContainer}
        onPress={() => searchRef.current.focus()}
    >
        <FontAwesome
            name="search"
            size={calcWidth(4)}
            color="gray"
        />
        <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder="Search"
            placeholderTextColor="gray"
            ref={searchRef}
        />
    </Pressable>
    );
}

export default Search;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: calcWidth(5),
        borderWidth: 1,
        borderColor: COLOR.BUTTON,
        borderRadius: 10,
        margin: calcHeight(2),
        marginBottom: calcHeight(5),
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
    }
});
