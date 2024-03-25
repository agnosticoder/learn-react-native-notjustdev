import Button from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Button text='Sign out' onPress={async () => await supabase.auth.signOut()}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 10,
        justifyContent: 'flex-end'
    }
});

export default ProfileScreen;