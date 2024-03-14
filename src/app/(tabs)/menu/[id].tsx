import { Image, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { Slot, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import Button from '@/src/components/Button';
import { useCart } from '@/src/provider/CartProvider';
import { PizzaSize } from '@/src/types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
    const { items, addItem, updateQuantity } = useCart();
    const router = useRouter();

    const product = products.find((product) => product.id.toString() === id);

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Product not found</Text>
            </View>
        );
    }

    const addToCart = () => {
        if(!product) return;

        const isItemInCart = items.find((item) => item.product_id === product.id && item.size === selectedSize);

        if(isItemInCart) {
            updateQuantity(isItemInCart.id, 1);
            router.push('/cart');
            return;
        }

        addItem({product, size: selectedSize});
        router.push('/cart');
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
            />
            <Text>Select Size</Text>
            <View style={styles.sizes}>
                {sizes.map((size) => (
                    <Pressable style={[styles.size, {backgroundColor: selectedSize === size ? 'gainsboro': 'white'}]} onPress={() => setSelectedSize(size)} key={size}>
                        <Text style={[styles.sizeText, {color: selectedSize === size ? 'black' : 'gray'}]}>{size}</Text>
                    </Pressable>
                ))}
            </View>
            <Text style={styles.price}>${product.price}</Text>
            <Button text="Add to Cart" onPress={addToCart}/>
        </View>
    );
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 'auto'
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500',
    }
});