import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { Link, Slot, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import Button from '@/src/components/Button';
import { useCart } from '@/src/provider/CartProvider';
import { PizzaSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
    const { items, addItem, updateQuantity } = useCart();
    const router = useRouter();
    const colorSchems = useColorScheme();

    const product = products.find((product) => product.id.toString() === id);

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Product not found</Text>
            </View>
        );
    }

    const addToCart = () => {
        if (!product) return;

        const isItemInCart = items.find(
            (item) =>
                item.product_id === product.id && item.size === selectedSize
        );

        if (isItemInCart) {
            updateQuantity(isItemInCart.id, 1);
            router.push('/cart');
            return;
        }

        addItem({ product, size: selectedSize });
        router.push('/cart');
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: product.name,
                    headerShown: true,
                    headerRight: () => (
                        <Link href="/cart" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={
                                            Colors.light.tint
                                        }
                                        style={{
                                            marginRight: 15,
                                            opacity: pressed ? 0.5 : 1,
                                        }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
            />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});