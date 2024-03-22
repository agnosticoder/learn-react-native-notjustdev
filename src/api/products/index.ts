import { Tables, TablesInsert } from '@/src/database.types';
import { supabase } from '@/src/lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export const useProductList = () => {
    const {
        data: products,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = await supabase.from('products').select('*');
            if (error) throw new Error(error.message);
            else return data;
        },
    });

    return { products, error, isLoading };
};

export const useProduct = (id: number) => {
    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();
            if (error) throw new Error(error.message);
            else return data;
        },
    });

    return { product, isLoading, error };
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: TablesInsert<'products'>) => {
            const { data: newProduct, error } = await supabase
                .from('products')
                .insert({
                    name: data.name,
                    price: data.price,
                    image: data.image,
                })
                .single();

            if (error) throw new Error(error.message);
            else return newProduct;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            const { data: updatedProduct, error } = await supabase
                .from('products')
                .update({
                    name: data.name,
                    price: data.price,
                    image: data.image,
                })
                .eq('id', data.id)
                .select()
                .single();

            if (error) throw new Error(error.message);
            else return updatedProduct;
        },
        onSuccess: async (_, data) => {
            await queryClient.invalidateQueries({ queryKey: ['products'] });
            await queryClient.invalidateQueries({
                queryKey: ['product', data.id],
            });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const {data: deletedProduct, error} = await supabase.from('products').delete().eq('id', id);

            if (error) throw new Error(error.message);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};
