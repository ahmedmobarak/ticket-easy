import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Local } from "../../enviroment";
import { ApiRoutes } from "../../helpers/apiRoutes";
import { AppRoutes } from "../../helpers/appRoutes";
import { UserContext } from "../../context/userContext";

export default function LoginComponent({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsloading] = useState(false);

    const userContext = useContext(UserContext);

    useEffect(() => {
        AsyncStorage.getItem('USER').then(user => {
            if (user !== null) navigation.navigate('Tab');
        })
    }, [])


    const login = () => {
        setIsloading(true);
        axios.post(Local.baseUrl + ApiRoutes.auth.login,
            {
                email: email,
                password: password
            })
            .then(function (res) {
                let user = {
                    id: res.data[0]._id,
                    name: res.data[0].name,
                    email: res.data[0].email,
                    phone: res.data[0].phone
                }
                setIsloading(false);
                storeUserInfo(JSON.stringify(user));
                userContext.setUser(user);
                navigation.navigate('Tab');
            })
            .catch((err) => {
                setIsloading(false);
                console.log('lkldkflk',err);
            }
            )
    }

    async function storeUserInfo(user) {
        try {
            await AsyncStorage.setItem('USER', user, (result) => {
                setIsloading(false);
            });
          setIsloading(false);
        } catch (error) {
            console.log('Can not login properly', error);
        }
    }

    return (
        <ImageBackground style={{width: '100%', height: '100%'}} source={require('../../assets/login.jpg')}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View>
                       <Text style={{ color: '#15233f' }}>Email</Text>
                    <TextInput onChangeText={setEmail} style={styles.input} placeholder='example@email.com' placeholderTextColor={'#15233f'} textContentType='emailAddress'></TextInput> 
                    </View>

                    <View>
                       <Text style={{ color: '#15233f' }}>Password</Text>
                    <TextInput onChangeText={setPassword} style={styles.input} placeholder='password' placeholderTextColor={'#15233f'} secureTextEntry></TextInput> 
                    </View>
                    
                    <TouchableOpacity style={styles.btn} onPress={() => login()} ><Text style={styles.btnText}>Login</Text></TouchableOpacity>
                    <TouchableOpacity style={{  }} onPress={() => {navigation.navigate(AppRoutes.signup)}} ><Text style={{textDecorationLine: 'underline'}}>Don't have account?</Text></TouchableOpacity>
                    <StatusBar style="auto" />
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
        height: '50%',
        marginBottom: 100
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