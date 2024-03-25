import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCreateProduct, useDeleteProduct, useProduct, useUpdateProduct } from '@/src/api/products';
import * as FileSystem from 'expo-file-system';
import { randomUUID } from 'expo-crypto';
import { supabase } from '@/src/lib/supabase';
import { decode } from 'base64-arraybuffer';

const CreateProductScreeen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);
    
    const isUpdating = !!id;
    const router = useRouter();

    const { mutate: createProduct } = useCreateProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const {mutate: deleteProduct} = useDeleteProduct();
    const { product: updatingProduct } = useProduct(id);

    useEffect(() => {
        if (isUpdating && updatingProduct) {
            setName(updatingProduct.name);
            setPrice(updatingProduct.price.toString());
            setImage(updatingProduct.image);
        }
    }, [updatingProduct]);

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

        setError('');
        return true;
    };

    const onCreate = async () => {
        if (!validateInput()) return;

        const imagePath = await uploadImage();

        //Save in the Database
        createProduct(
            { name, price: parseFloat(price), image:imagePath },
            {
                onSuccess: () => {
                    resetFields();
                    router.back();
                },
            }
        );
    };

    const onUpdate = async () => {
        if (!validateInput()) return;

        const imagePath = await uploadImage();

        //Save in the Database
        updateProduct(
            { id, name, price: parseFloat(price), image:imagePath },
            {
                onSuccess: () => {
                    resetFields();
                    router.back();
                },
            }
        );
    };

    const onDelete = () => {
        deleteProduct(id, {
            onSuccess: () => {
                resetFields();
                console.log('Product Deleted');
                router.replace('/(admin)');
            },
        
        });
    }

    const onConfirmDelete = () => {
       Alert.alert('Delete Product', 'Are you sure you want to delete this product?', [
              {text: 'Cancel'},
              {text: 'Delete', style: 'destructive', onPress: onDelete}
         ]);
    };

    const onSubmit =  () => {
        if(isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    }

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

    const uploadImage = async () => {
        if (!image?.startsWith('file://')) {
            return;
        }

        const base64 = await FileSystem.readAsStringAsync(image, {
            encoding: 'base64',
        });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, decode(base64), { contentType });

        if (data) {
            console.log('Image uploaded', data);
            return data.path;
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />
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
                <Button text={isUpdating? 'Update' : 'Create'} onPress={onSubmit} />
                {isUpdating && <Text onPress={onConfirmDelete} style={[styles.textButton, {color: 'red'}]}>Delete</Text>}
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