import { Alert } from 'react-native';
import { supabase } from './supabase';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';

const fetchPaymentSheetParams = async (amount: Number) => {
    const {data, error} = await supabase.functions.invoke('payment-sheet', {
        body: { amount },
    });

    if(data) {
        return data;
    }

    Alert.alert('Error fetching payments');
    return {};
};

const initializePaymentSheet = async (amount: Number) => {
    console.log('Initializing payment sheet', amount);

    const { paymentIntent, publishableKey, customer, ephemeralKey } = await fetchPaymentSheetParams(
        amount
    );

    if (!paymentIntent || !publishableKey) return;

    await initPaymentSheet({
        merchantDisplayName: 'Pizza Emporium',
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        defaultBillingDetails: {
            name: 'John Doe',
            phone: '555-555-5555',
            email: 'johndoe@dummy.com',
        }
    })
};

export const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet({});
    
    console.log(JSON.stringify(error, null, 2));

    if (error) {
        Alert.alert('Error processing payments');
        return false;
    }

    return true;
};

export default initializePaymentSheet;