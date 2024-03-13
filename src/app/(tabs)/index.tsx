import { Image, ScrollView, StyleSheet } from 'react-native';
import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';

export default function MenuScreen() {
    return (
        <ScrollView>
            <ProductListItem product={products[0]} />
            <ProductListItem product={products[1]} />
            <ProductListItem product={products[2]} />
        </ScrollView>
    );
}