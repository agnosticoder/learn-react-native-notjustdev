import { View, Text } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';

const index = () => {
    // return <Redirect href='/(auth)/sign-in' />;
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
            <Link href={'/(user)'} asChild>
                <Button text="User" />
            </Link>
            <Link href={'/(admin)'} asChild>
                <Button text="Admin" />
            </Link>
            <Link href={'/(auth)/sign-in'} asChild>
                <Button text="Sign In" />
            </Link>
        </View>
    );
};

export default index;