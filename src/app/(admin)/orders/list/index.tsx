import { useAdminOrderList } from '@/src/api/orders';
import { useInsertOrderSubscription } from '@/src/api/orders/subscriptions';
import OrderItem from '@/src/components/OrderItem';
import { supabase } from '@/src/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

const Orders = () => {
    const {data: orders, isLoading, error} = useAdminOrderList({archived: false});

    useInsertOrderSubscription();

    if(isLoading) return <ActivityIndicator />;

    if(error) return <Text>Failed to fetch</Text>;

    return (
        <View>
            <Stack.Screen options={{ title: 'Active' }} />
            <FlatList
                data={orders}
                renderItem={({ item: order }) => <OrderItem order={order} />}
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />
        </View>
    );
};

export default Orders;
