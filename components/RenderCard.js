import Card from './card';
import { View, StyleSheet, Button } from 'react-native';
import { getLocalStoreData, setLocalStoreData } from '../helper/localStorage';
import { CARDS } from '../constants/string';
import { useAuth } from '../context/AuthContext';

function RenderCardComponent({ item }) {
    const { setCards } = useAuth();

    async function deleteCard() {
        const encryptedCards = await getLocalStoreData(CARDS);
        encryptedCards.splice(item.index, 1);
        await setLocalStoreData(CARDS, encryptedCards);
        setCards((prev) => prev.filter((card) => card.index != item.index));
    }

    return (
        <View style={styles.container}>
            <Card item={item} />
            <Button title="Delete" onPress={deleteCard} />
        </View>
    );
}

export default ({ item }) => <RenderCardComponent item={item} />;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        backgroundColor: '#fff',
    },
});
