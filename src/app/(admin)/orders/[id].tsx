import orders from '@/assets/data/orders';
import OrderItem from '@/src/components/OrderItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native'

const OrderDetails = () => {
    const { id } = useLocalSearchParams();

    const order = orders.find((order) => order.id.toString() === id);

    if (!order) return;

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />
            <OrderItem order={order} />
            <FlatList
                data={order.order_items}
                renderItem={({ item }) => (
                    <OrderItemListItem key={item.id} item={item} />
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