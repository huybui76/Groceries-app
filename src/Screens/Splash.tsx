import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { myColors } from '../Utils/MyColors';
import { useNavigation } from '@react-navigation/native';

interface SplashProps { }

const Splash = (props: SplashProps) => {
    const nav = useNavigation()
    useEffect(() => {
        setTimeout(() => {

            nav.replace('Sign')
        }, 3000)
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <View style={styles.Content}>
                <Image style={styles.icon} source={require('../assets/logoIcon.png')} />
                <View>

                    <Text style={styles.logoText}>nectar</Text>
                    <Text style={styles.logoText1}>online groceries</Text>
                </View>
            </View>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.primary,
        justifyContent: 'center',
    },
    Content: {
        // /backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15
    },
    icon: {
        tintColor: myColors.secondary,
        height: 75,
        width: 65,

    },
    logoText: {
        fontSize: 75,
        color: myColors.secondary
    }, logoText1: {
        fontSize: 17,
        color: myColors.secondary,
        textAlign: 'center',
        letterSpacing: 5,
        top: -15
    },

});
