import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, ScrollView, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { authentication, database } from '../../Firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { myColors } from '../Utils/MyColors';

const Sign = () => {
    const [userCre, setUserCre] = useState({
        email: '',
        password: '',
        name: '',
    });
    const { email, password, name } = userCre;
    const [hindPass, setHindPass] = useState(true);
    const nav = useNavigation();

    const handleSignUp = async () => {
        if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters long.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(authentication, email, password);
            const user = userCredential.user;

            // Use Firebase's automatically generated UID
            const uid = user.uid;

            // Store user data in Firestore
            await setDoc(doc(database, "users", uid), {
                username: name,
                email: email,
                id: uid,
            });

            // Alert.alert('User account created & signed in!');
            nav.navigate('Login');
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error) => {
        switch (error.code) {
            case 'auth/email-already-in-use':
                Alert.alert('That email address is already in use!');
                break;
            case 'auth/invalid-email':
                Alert.alert('That email address is invalid!');
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
                    <Text style={styles.signText}>Sign Up</Text>
                    <Text style={styles.signText1}>Enter your credentials to continue</Text>
                    <Text style={styles.signText2}>Username</Text>
                    <TextInput
                        value={name}
                        onChangeText={(val) => { setUserCre({ ...userCre, name: val }) }}
                        keyboardType="name-phone-pad"
                        maxLength={9}
                        style={styles.TextInput1}
                    />
                    <Text style={styles.signText2}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={(val) => { setUserCre({ ...userCre, email: val }) }}
                        keyboardType="email-address"
                        style={styles.TextInput1}
                    />

                    <Text style={styles.signText2}>Password</Text>
                    <View style={styles.hindPass}>
                        <TextInput
                            value={password}
                            onChangeText={(val) => { setUserCre({ ...userCre, password: val }) }}
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
                    <Text style={styles.continueText}>
                        By continue you agree to our Teems of Service and Privacy Policy
                    </Text>
                    <TouchableOpacity
                        style={styles.signButton}
                        onPress={() => { handleSignUp() }}>
                        <Text style={styles.signButton1}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.signText4}>
                        <Text style={styles.signText3}>
                            Already have an account ?
                        </Text>
                        <TouchableOpacity
                            onPress={() => { nav.navigate('Login') }}>
                            <Text style={styles.signText5}>Login Now</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Sign;

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

    }


});
