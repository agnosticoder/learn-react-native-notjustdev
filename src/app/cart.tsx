import { StatusBar } from 'expo-status-bar';
import { Text, View } from '../components/Themed';
import { FlatList, Platform } from 'react-native';
import { useCart } from '../provider/CartProvider';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';

const CartScreen = () => {
    const {items, total, checkout} = useCart();

    return (
        <View style={{ padding: 10 }}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <View key={item.id}>
                        <CartListItem cartItem={item} />
                    </View>
                )}
                contentContainerStyle={{ gap: 20 }}
            />

            <Text style={{marginTop: 20, fontSize: 20, fontWeight: 'bold'}}>Total: ${total}</Text>
            <Button text="Checkout" onPress={checkout} />

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
};

export default CartScreen;