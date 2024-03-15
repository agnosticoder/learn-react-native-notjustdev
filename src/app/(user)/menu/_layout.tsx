import Colors from '@/src/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

const MenuStack = () => {
    const colorSchems = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerRight: () => (
                    <Link href="/cart" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="shopping-cart"
                                    size={25}
                                    color={Colors[colorSchems ?? 'light'].text}
                                    style={{
                                        marginRight: 15,
                                        opacity: pressed ? 0.5 : 1,
                                    }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
            }}
        />
    );
};

export default MenuStack;