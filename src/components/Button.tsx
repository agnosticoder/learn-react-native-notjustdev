import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './Themed';
import Colors from '../constants/Colors';
import { ComponentPropsWithRef, forwardRef } from 'react';

type ButtonProps = ComponentPropsWithRef<typeof Pressable> & {
    text: String;
};

//? I don't know how this works
const Button = forwardRef<View | null, ButtonProps>(({ text, ...pressableProps}, ref) => {
    return (
        <Pressable {...pressableProps} ref={ref} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
});


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.tint,
        padding: 10,
        alignItems: 'center',
        borderRadius: 100,
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    }
});

export default Button;