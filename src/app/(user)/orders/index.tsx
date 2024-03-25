import { useMyOrderList } from '@/src/api/orders';
import { useUpdateOrderSubscription } from '@/src/api/orders/subscriptions';
import OrderItem from '@/src/components/OrderItem';
import { Stack } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

const Orders = () => {
    const {data: orders, isLoading, error} = useMyOrderList();

    if(isLoading) return <ActivityIndicator />;

    if(error) return <Text>Failed to fetch</Text>;

    return (
        <View>
            <Stack.Screen options={{ title: 'Orders' }} />
            <FlatList
                data={orders}
                renderItem={({ item: order }) => (
                    <OrderItem key={order.id} order={order} />
                )}
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />
        </View>
    );
};

export default Orders;
