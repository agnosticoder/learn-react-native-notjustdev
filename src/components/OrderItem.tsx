import { Link, useSegments } from 'expo-router';
import { Order } from '../types';
import { Text, Pressable, StyleSheet, View } from 'react-native';

const timeSince = (date: string) => {
    const seconds = Math.floor((Date.now() - Date.parse(date)) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + ' years';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + ' months';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + ' days';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + ' hours';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
};

const OrderItem = ({ order }: { order: Order }) => {
    const segment = useSegments();

    return (
        <>
            <Link
                key={order.id}
                // @ts-ignore
                href={`/${segment[0]}/orders/${order.id}`}
                asChild
            >
                <Pressable style={styles.container}>
                    <View style={{ flex: 1, gap: 5 }}>
                        <Text style={styles.order}>Order #{order.id}</Text>
                        <Text style={styles.time}>
                            {timeSince(order.created_at)} ago
                        </Text>
                    </View>
                    <Text style={styles.status}>{order.status}</Text>
                </Pressable>
            </Link>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    order: {
        fontSize: 16,
        fontWeight: '600',
    },
    time: {
        fontSize: 14,
        color: 'gray',
    },
    status: {
        fontSize: 16,
        fontWeight: '600',
        alignSelf: 'center',
    },
});

export default OrderItem;
