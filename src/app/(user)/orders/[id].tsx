import { useOrderDetails } from '@/src/api/orders';
import OrderItem from '@/src/components/OrderItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

const OrderDetails = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const {data: order, isLoading, error} = useOrderDetails(id);

    if(isLoading) return <ActivityIndicator />;

    if (!order) return <Text>Failed to fetch</Text>;

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />
            <OrderItem order={order} />
            <FlatList
                data={order.order_items}
                renderItem={({ item }) => (
                    <OrderItemListItem item={item} />
                )}
                contentContainerStyle={{ gap: 10, marginTop: 10 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 10,
    }
});

export default OrderDetails;