import { ReactNode, createContext, useContext, useState } from 'react';
import { CartItem } from '../types';
import { randomUUID } from 'expo-crypto';
import { Tables } from '../database.types';
import { useCreateOrder } from '../api/orders';
import { useRouter } from 'expo-router';
import { useCreateOrderItem } from '../api/order-items';

type Product = Tables<'products'>;

type Cart = {
    items: CartItem[];
    addItem: ({
        product,
        size,
    }: {
        product: Product;
        size: CartItem['size'];
    }) => void;
    updateQuantity: (ItemId: string, quantity: 1 | -1) => void;
    total: number;
    checkout: () => void;
};

export const CartCotext = createContext<Cart>({items: [], addItem: () => {}, updateQuantity: () => {}, total: 0, checkout: () => {}});

export const useCart = () => useContext(CartCotext);

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const {mutate: createOrder} = useCreateOrder();
    const {mutate: createOrderItem} = useCreateOrderItem();
    const router = useRouter();

    const addItem = ({
        product,
        size,
    }: {
        product: Product;
        size: CartItem['size'];
    }) => {
        const cartItem: CartItem = {
            id: randomUUID(),
            product,
            size,
            product_id: product.id,
            quantity: 1,
        };

        setItems((currentItems) => [...currentItems, cartItem]);
    };

    const updateQuantity = (ItemId: string, quantity: 1 | -1) => {
        setItems((currentItems) =>
            currentItems.map((item) => {
                if (item.id === ItemId) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity,
                    };
                }

                return item;
            }).filter((item) => item.quantity > 0)
        );
    };

    const total = Math.round(items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0) * 100) / 100;

    const checkout = () => {
        createOrder(
            { total },
            {
                onSuccess: saveOrderItems
            }
        );
    };

    const saveOrderItems = (order: Tables<'orders'>) => {
        const orderItems = items.map((item) => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            size: item.size,
        }));

        createOrderItem(orderItems, {
            onSuccess: () => {
                setItems([]);
                router.navigate(`/(user)/orders/${order.id}`);
            },
        });
    };

    return (
        <CartCotext.Provider value={{ items, addItem, updateQuantity, total, checkout }}>
            {children}
        </CartCotext.Provider>
    );
};

export default CartProvider;