import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, ScrollView, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { myColors } from '../Utils/MyColors';
import { authentication } from '../../Firebaseconfig';

const Login = () => {
    const [loginCre, setLoginCre] = useState({
        email: '',
        password: '',
    });
    const { email, password } = loginCre;
    const [hindPass, setHindPass] = useState(true);
    const nav = useNavigation();

    const handleLogin = async () => {
        if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters long.');
            return;
        }

        try {
            await signInWithEmailAndPassword(authentication, email, password);
            nav.navigate('Home');
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error) => {
        switch (error.code) {
            case 'auth/wrong-password':
                Alert.alert('Wrong password for this account');
                break;
            case 'auth/user-not-found':
                Alert.alert('Please check your email, password, and try again');
                break;
            case 'auth/invalid-email':
                Alert.alert('Invalid email address');
                break;
            case 'auth/weak-password':
                Alert.alert('Password must be at least 6 characters long.');
                break;
            default:
                Alert.alert('An error occurred. Please try again later.');
                console.error(error);
                break;
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <ScrollView style={styles.container}>
                <Image style={styles.icon} source={require('../assets/logoIcon.png')} />
                <View style={styles.signArea}>
                    <Text style={styles.signText}>Login</Text>
                    <Text style={styles.signText1}>Enter your emails and password</Text>

                    <Text style={styles.signText2}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={(val) => { setLoginCre({ ...loginCre, email: val }) }}
                        keyboardType="email-address"
                        style={styles.TextInput1}
                    />

                    <Text style={styles.signText2}>Password</Text>
                    <View style={styles.hindPass}>
                        <TextInput
                            value={password}
                            onChangeText={(val) => { setLoginCre({ ...loginCre, password: val }) }}
                            secureTextEntry={hindPass}
                            keyboardType="ascii-capable"
                            maxLength={10}
                            style={styles.TextInput2} />
                        <MaterialCommunityIcons
                            name={hindPass == true ? "eye-off-outline" : "eye-outline"}
                            size={24}
                            color="black"
                            onPress={() => setHindPass(!hindPass)} />
                    </View>

                    <View style={styles.fogotText}>
                        <Text style={styles.fogotText1}>
                            Forgot Password?
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.signButton}
                        onPress={() => { handleLogin() }}>
                        <Text style={styles.signButton1}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.signText4}>
                        <Text style={styles.signText3}>
                            Don't have an account ?
                        </Text>
                        <TouchableOpacity
                            onPress={() => { nav.navigate('Sign') }}>
                            <Text style={styles.signText5}>SignUp Now</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.secondary,
        paddingTop: 30,
    },
    icon: {
        alignSelf: 'center',

    }, signArea: {
        paddingHorizontal: 20,
        marginTop: 50
    }, signText: {
        fontSize: 24,
        color: myColors.third,
        fontWeight: "500"
    }, signText1: {
        fontSize: 16,
        color: myColors.gray,
        fontWeight: "400",
        marginTop: 10
    }, signText2: {
        fontSize: 17,
        color: myColors.gray,
        fontWeight: "500",
        marginTop: 30
    }, TextInput1: {
        fontSize: 16,
        borderBottomWidth: 2,
        borderColor: myColors.lightGray,
        marginTop: 15
    }

    , TextInput2: {
        fontSize: 16,
        marginTop: 15,
        flex: 0.8,
        // /backgroundColor: 'red',

    }, hindPass: {
        borderColor: myColors.lightGray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        alignItems: 'center'

    }, continueText: {
        fontSize: 14,
        fontWeight: "400",
        color: myColors.third,
        marginTop: 15,
        letterSpacing: 0.7,
        lineHeight: 25,
        width: "95%",
        opacity: 0.7

    }, signButton: {
        backgroundColor: myColors.primary,
        marginTop: 30,
        height: 70,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

    }, signButton1: {
        fontSize: 19,
        color: myColors.secondary

    }, signText3: {
        fontSize: 16

    }, signText4: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        gap: 5

    }, signText5: {
        color: myColors.primary,
        fontSize: 15,
        fontWeight: "600"

    }, fogotText: {

        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,

    }, fogotText1: {
        color: myColors.third,
        fontSize: 15,
        fontWeight: "600",
        opacity: 0.7

    }


});
