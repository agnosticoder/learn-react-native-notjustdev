import { Image, StyleSheet, Text, View } from 'react-native';
import { OrderItem } from '../types';
import { defaultPizzaImage } from './ProductListItem';
import Colors from '../constants/Colors';

const OrderItemListItem = ({item}: {item: OrderItem}) => {
    return (
        <View key={item.id} style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', gap: 5 }}>
                <Image
                    style={styles.image}
                    source={{
                        uri: item.products.image || defaultPizzaImage,
                    }}
                />
                <View style={{ flex: 1, gap: 5, alignSelf: 'center' }}>
                    <Text style={styles.name}>{item.products.name}</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        <Text style={styles.price}>
                            ${item.products.price}
                        </Text>
                        <Text style={styles.size}>Size: {item.size}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.quantity}>{item.quantity}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
    },
    image: {
        width: 80,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    name: {
        fontSize: 16,
        fontWeight: '500'
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.light.tint,
    },
    size: {
        fontSize: 14,
    },
    quantity: { 
        fontSize: 16,
        fontWeight: '700',
        alignSelf: 'center',
    }
});


export default OrderItemListItem;