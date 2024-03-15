import { FlatList, Image, ScrollView, StyleSheet } from 'react-native';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { View } from '@/src/components/Themed';
import { Stack } from 'expo-router';

export default function MenuScreen() {
    return (
        <View>
            <Stack.Screen options={{ title: 'Menu' }} />
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