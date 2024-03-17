import AuthForm from '@/src/components/AuthForm';
import { Stack, usePathname } from 'expo-router';

const SignUp = () => {
    const path = usePathname();
    const isSignup = path === '/sign-up';

    return (
        <>
            <Stack.Screen options={{ title: 'Sign Up' }} />
            <AuthForm isSignup={isSignup} />
        </>
    );
}

export default SignUp;