import { ActivityIndicator, FlatList, Text } from 'react-native';
import ProductListItem from '@/src/components/ProductListItem';
import { View } from '@/src/components/Themed';
import { Stack } from 'expo-router';
import { useProductList } from '@/src/api/products';

export default function MenuScreen() {
    const {products, isLoading, error} = useProductList();

    if(isLoading) return <ActivityIndicator />;

    if(error) return <Text>Failed to load products</Text>;

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