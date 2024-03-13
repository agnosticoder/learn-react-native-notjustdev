import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { Stack, useLocalSearchParams } from 'expo-router';

const ProductDetailScreen = () => {
    const { id } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Details ' + id}} />
            <Text>Product Detailed Screen</Text>
            <Text>{id}</Text>
        </View>
    );
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});