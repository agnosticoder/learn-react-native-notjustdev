import { ActivityIndicator, Image, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import { useCart } from '@/src/provider/CartProvider';
import { PizzaSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const { product, isLoading, error } = useProduct(id);
    const [selectedSize] = useState<PizzaSize>('M');
    const { addItem } = useCart();
    const router = useRouter();

    if(isLoading) return <ActivityIndicator />;

    if(error) return <Text>Failed to load products</Text>;

    const addToCart = () => {
        if (!product) return;

        addItem({ product, size: selectedSize });
        router.push('/cart');
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: product?.name,
                    headerShown: true,
                    headerRight: () => (
                        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
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
                source={{ uri: product?.image || defaultPizzaImage }}
                style={styles.image}
            />
            <Text style={styles.title}>{product?.name}</Text>
            <Text style={styles.price}>${product?.price}</Text>
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