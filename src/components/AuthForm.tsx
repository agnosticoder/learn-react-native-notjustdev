import Button from '@/src/components/Button';
import Colors from '@/src/constants/Colors';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

const AuthForm = ({ isSignup }: { isSignup?: boolean }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const resetFields = () => {
        setEmail('');
        setPassword('');
    };

    const validateInputs = () => {
        if (email === '' || password === '') {
            setError('Please fill in all fields');
            return false;
        }

        setError('');
        return true;
    };

    const SignIn = () => {
        if (!validateInputs()) return;

        //Sign in
        console.log('Signing in', { email, password });

        resetFields();
    };

    const SignUp = () => {
        if (!validateInputs()) return;

        //Sign up
        console.log('Signing up', { email, password });

        resetFields();
    };

    const onSubmit = () => {
        if (isSignup) {
            SignUp();
        } else {
            SignIn();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholder="johndoe@xmail.com"
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    placeholder=""
                    secureTextEntry
                />

                <Text style={{ color: 'red' }}>{error}</Text>
                <Button
                    text={isSignup ? 'Sign up' : 'Sign in'}
                    onPress={onSubmit}
                />

                <Link
                    style={styles.textButton}
                    href={isSignup ? '/(auth)/sign-in' : '/(auth)/sign-up'}
                    asChild
                >
                    <Text>{isSignup ? 'Sign in' : 'Create an account'}</Text>
                </Link>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    }
});

export default AuthForm;
