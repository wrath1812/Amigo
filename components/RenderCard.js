import Card from './card';
import { View,StyleSheet,Button } from 'react-native';

function RenderCard({item})
{
    return (
        <View style={styles.container}>
            <Card item={item} />
            <Button title="Delete" onPress={() => {}} />
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