import { Image, StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import Colors from '../constants/Colors';
import products from '@/assets/data/products';

type Product = typeof products[0];

const ProductListItem = ({ product }: { product: Product }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
});

export default ProductListItem;