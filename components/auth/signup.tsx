import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useRef } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, StatusBar, ImageBackground, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Local } from "../../enviroment";
import { ApiRoutes } from "../../helpers/apiRoutes";
import { AppRoutes } from "../../helpers/appRoutes";

export function SignupComponent({navigation}){
    const name = useRef(null as string);
    const email = useRef(null as string);
    const phone = useRef(null as number);
    const password = useRef(null as string);
    const confirmPassword = useRef(null as string);

    async function storeUserInfo(user) {
        try {
            await AsyncStorage.setItem('USER', user);
        } catch (error) {
            console.log('Can not login properly', error);
        }
    }

    const signup = () => {
        axios.post(Local.baseUrl+ApiRoutes.auth.signup, {
            name: name.current.value,
            email: email.current.value,
            phone: phone.current.value,
            password: password.current.value,
            confirmPassword: confirmPassword.current.value
        }).then((res) => {
            let user = {
                id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone
            }
            storeUserInfo(JSON.stringify(user));
            navigation.navigate(AppRoutes.tab);
        })
        .catch((err) => {
            console.log(err);
        }
        )
        
    }

    function validateName(name: string){
        const regex = /^[a-zA-Z ]{2, 30}$/;
        console.log(regex.test(name));
        console.log(name)
    }

    function validate(e, name: string): void {
        validateName(e.target.value);
    }

    return (
        <ImageBackground style={{width: '100%', height: '100%'}} source={require('../../assets/login.jpg')}>
        <View style={styles.container}>
            <View style={styles.card}>
                <View>
                <Text style={{ color: '#15233f' }}>Name</Text>
                <TextInput id="name" onChange={(e) => validate(e, 'name')} ref={name} style={styles.input} placeholder='e. John Doe' blurOnSubmit placeholderTextColor={'#15233f'} ></TextInput>
                </View>
                <View>
                <Text style={{ color: '#15233f' }}>Email</Text>
                <TextInput ref={email} style={styles.input} placeholder='example@email.com' blurOnSubmit placeholderTextColor={'#15233f'} keyboardType={'email-address'} textContentType='emailAddress'></TextInput>
                </View>
                <View>
                <Text style={{ color: '#15233f' }}>Phone number</Text>
                <TextInput ref={phone} style={styles.input} placeholder='0xxxxxxxxx' blurOnSubmit placeholderTextColor={'#15233f'} keyboardType={'phone-pad'}></TextInput>
                </View>
                <View>
                <Text style={{ color: '#15233f' }}>Password</Text>
                <TextInput ref={password} style={styles.input} placeholder='password' blurOnSubmit placeholderTextColor={'#15233f'} secureTextEntry></TextInput>
                </View>
                <View>
                <Text style={{ color: '#15233f' }}>Confirm Password</Text>
                <TextInput ref={confirmPassword} style={styles.input} placeholder='confirm password' blurOnSubmit placeholderTextColor={'#15233f'} secureTextEntry></TextInput>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => signup()} ><Text style={styles.btnText}>Sign up</Text></TouchableOpacity>
                <TouchableOpacity style={{  }} onPress={() => {navigation.navigate(AppRoutes.login)}} ><Text style={{textDecorationLine: 'underline'}}>Already have an account?</Text></TouchableOpacity>
            </View>
        </View>
        </ImageBackground>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        padding: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 30,
        justifyContent: 'space-around',
        width: '90%',
        height: '80%'
    },
    input: {
        color: '#15233f',
        padding: 15,
        borderRadius: 30,
        borderColor: '#A0A0A0',
        borderStyle: 'solid',
        borderWidth: 1,
        marginTop: 10,
        shadowColor: '#333333',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowRadius: 5,
        shadowOpacity: 0.5
    },
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#48CC8F',
        padding: 15,
        borderRadius: 30
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 18
    }
});


