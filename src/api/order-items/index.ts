import { TablesInsert, TablesUpdate } from '@/src/database.types';
import { supabase } from '@/src/lib/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateOrderItem = () => {
    return useMutation({
        mutationFn: async (items: TablesInsert<'order_items'>[]) => {
            const { data: newProduct, error } = await supabase
                .from('order_items')
                .insert(items)
                .select();

            if (error) throw new Error(error.message);
            else return newProduct;
        },
    });
};
