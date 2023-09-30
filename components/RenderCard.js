import Card from './card';
import { View,StyleSheet,Button } from 'react-native';
import { getLocalStoreData, setLocalStoreData } from '../helper/localStorage';
import { CARDS } from '../constants/string';

function RenderCard({item})
{
    async function deleteCard()
    {
        const encryptedCards = await getLocalStoreData(CARDS);
        encryptedCards.splice(item.index,1);
        await setLocalStoreData(CARDS,encryptedCards);
    }
    
    return (
        <View style={styles.container}>
            <Card item={item} />
            <Button title="Delete" onPress={deleteCard} />
        </View>
    )
}

export default RenderCard;

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        backgroundColor: '#fff',
    }
});