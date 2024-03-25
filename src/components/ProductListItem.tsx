import { Image, Pressable, StyleSheet } from 'react-native';
import { Text } from './Themed';
import Colors from '../constants/Colors';
import { Link, useSegments } from 'expo-router';
import { Tables } from '../database.types';
import RemoteImage from './RemoteImage';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

const ProductListItem = ({ product }: { product: Tables<'products'> }) => {
    const [first] = useSegments();

    return (
        <>
            {/* @ts-ignore */}
            <Link href={`/${first}/menu/${product.id}`} asChild>
                <Pressable style={styles.container}>
                    <RemoteImage
                        style={styles.image}
                        path={product.image}
                        fallback={defaultPizzaImage}
                    />
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                </Pressable>
            </Link>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      flex: 1,
      maxWidth: '50%',
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
        resizeMode: 'contain',
    },
});

export default ProductListItem;