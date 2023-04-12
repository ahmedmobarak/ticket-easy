import React, { useState, useEffect } from "react";
import { I18nManager, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventsScreen } from "../segments/events";
import { LocalStorageKeys } from "../../helpers/localStorageKeys";


export function HomeComponent({navigation}){
    const [user, setUser] = useState({});
    useEffect(() => {
      getUser()
    }, [])
    
    async function getUser() {
        try {
            const savedUser = await AsyncStorage.getItem(LocalStorageKeys.user);
            setUser({
                name: savedUser.name,
                email: savedUser.email,
                phone: savedUser.phone
            });
        } catch (error) {
            console.log(error)
            // navigation.navigate(AppRoutes.login)
        }
    }
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <EventsScreen/>
        </View>
    )
}


