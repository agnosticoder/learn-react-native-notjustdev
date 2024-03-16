import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { useState } from 'react';
import { Image, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { set } from 'zod';
import { Stack } from 'expo-router';

const CreateProductScreeen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const resetFields = () => {
        setName('');
        setPrice('');
        setImage(null);
    };

    const validateInput = () => {
        if (name === '' || price === '') {
            setError('Please fill in all fields');
            return false;
        }

        if (isNaN(parseFloat(price))) {
            setError('Price must be a number');
            return false;
        }

        //validate image
        if (!image) {
            setError('Please select an image');
            return false;
        }

        setError('');
        return true;
    };

    const onCreate = () => {
        if (!validateInput()) return;

        //Save in the Database

        resetFields();
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if(result.canceled) return;

        setImage(result.assets[0].uri);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Stack.Screen options={{ title: 'Create Product' }} />
                <Image
                    style={styles.image}
                    source={{ uri: image || defaultPizzaImage }}
                />
                <Text onPress={pickImage} style={styles.textButton}>
                    Select Image
                </Text>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholder="Product Name"
                />

                <Text style={styles.label}>Price ($)</Text>
                <TextInput
                    value={price}
                    onChangeText={setPrice}
                    style={styles.input}
                    placeholder="9.99"
                    keyboardType="numeric"
                />

                <Text style={{ color: 'red' }}>{error}</Text>
                <Button text="Create" onPress={onCreate} />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CreateProductScreeen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    label:{
        color: 'gray',
        fontSize: 16
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    }
});