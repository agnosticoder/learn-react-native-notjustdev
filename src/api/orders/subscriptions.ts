import { supabase } from '@/src/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useInsertOrderSubscription = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const channels = supabase
            .channel('custom-insert-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'orders' },
                (payload) => {
                    queryClient.invalidateQueries({
                        queryKey: ['orders'],
                    });
                }
            )
            .subscribe();

        return () => {
            channels.unsubscribe();
        };
    }, []);
};

export const useUpdateOrderSubscription = ({
    orderId,
}: {
    orderId: Number;
}) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const channels = supabase
            .channel('custom-filter-channel')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `id=eq.${orderId}`,
                },
                (payload) => {
                    queryClient.invalidateQueries({queryKey: ['order', orderId]});
                }
            )
            .subscribe();

        return () => {
            channels.unsubscribe();
        };
    }, []);
};
