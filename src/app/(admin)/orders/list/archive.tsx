import orders from '@/assets/data/orders';
import OrderItem from '@/src/components/OrderItem';
import { Stack } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

const Archive = () => {
    return (
        <View>
            <Stack.Screen options={{ title: 'Archive' }} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 10,
    }
});

export default Archive;
