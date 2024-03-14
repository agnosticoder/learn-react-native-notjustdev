import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { Text } from './Themed';
import Colors from '../constants/Colors';

type ButtonProps = PressableProps & {
    text: String;
};

const Button = ({ text, onPress, ...rest }: ButtonProps) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

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