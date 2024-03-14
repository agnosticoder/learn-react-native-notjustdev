import { StatusBar } from 'expo-status-bar';
import { Text, View } from '../components/Themed';
import { FlatList, Platform } from 'react-native';
import { useCart } from '../provider/CartProvider';
import CartListItem from '../components/CartListItem';

const CartScreen = () => {
    const {items} = useCart();

    return (
        <View>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <View key={item.id}>
                        <CartListItem cartItem={item}/>
                    </View>
                )}
                contentContainerStyle={{padding: 20, gap: 20}}
            />

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
};

export default CartScreen;