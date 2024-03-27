import { useOrderDetails, useUpdateOrder } from '@/src/api/orders';
import OrderItem from '@/src/components/OrderItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import Colors from '@/src/constants/Colors';
import { notifyUserAboutOrderUpdate } from '@/src/lib/notifications';
import { OrderStatus, OrderStatusList } from '@/src/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const OrderDetails = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const {data: order, isLoading, error} = useOrderDetails(id);
    const {mutate: updateOrder, isPending} = useUpdateOrder();

    const onUpdateOrder = ({ status }: { status: OrderStatus }) => {
        updateOrder(
            { id, updatedFields: { status } },
            {
                onSuccess: (updatedOrder) => {
                    console.log('Order updated');
                    notifyUserAboutOrderUpdate(updatedOrder);
                },
            }
        );

    };

    if(isLoading) return <ActivityIndicator />;

    if (error || !order) return <Text>Failed to fetch</Text>;

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
                ListFooterComponent={
                    <>
                        <Text style={{ fontWeight: 'bold' }}>Status</Text>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            {OrderStatusList.map((status) => (
                                <Pressable
                                    key={status}
                                    onPress={() => onUpdateOrder({status})}
                                    style={{
                                        borderColor: Colors.light.tint,
                                        borderWidth: 1,
                                        padding: 10,
                                        borderRadius: 5,
                                        marginVertical: 10,
                                        backgroundColor:
                                            order.status === status
                                                ? Colors.light.tint
                                                : 'transparent',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:
                                                order.status === status
                                                    ? 'white'
                                                    : Colors.light.tint,
                                        }}
                                    >
                                        {status}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 10,
    },
});

export default OrderDetails;
