import { FlatList, Image, Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { View } from '@/src/components/Themed';
import { Link, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';

export default function MenuScreen() {
    const colorSchems = useColorScheme();

    return (
        <View>
            <Stack.Screen
                options={{
                    title: 'Menu',
                    headerRight: () => (
                        <Link href="/cart" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="plus-square-o"
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
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductListItem product={item} />}
                numColumns={2}
                contentContainerStyle={{ gap: 5, padding: 10 }}
                columnWrapperStyle={{ gap: 5 }}
            />
        </View>
    );
}