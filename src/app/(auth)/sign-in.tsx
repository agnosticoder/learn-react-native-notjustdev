import AuthForm from '@/src/components/AuthForm';
import {Stack} from 'expo-router';

const SignIn = () => {

    return (
        <>
            <Stack.Screen options={{ title: 'Sign In' }} />
            <AuthForm />
        </>
    );
};

export default SignIn;
