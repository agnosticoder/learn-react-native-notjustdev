import { ReactNode, createContext, useContext, useState } from 'react';
import { CartItem, Product } from '../types';
import { randomUUID } from 'expo-crypto';

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
};

export const CartCotext = createContext<Cart>({items: [], addItem: () => {}, updateQuantity: () => {}});

export const useCart = () => useContext(CartCotext);

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

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

        console.log( 'cartItem', cartItem)

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

    return (
        <CartCotext.Provider value={{ items, addItem, updateQuantity }}>
            {children}
        </CartCotext.Provider>
    );
};

export default CartProvider;