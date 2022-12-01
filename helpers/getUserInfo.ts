import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalStorageKeys } from "./localStorageKeys";

export async function getUserInfo(){
    let user;
    try{
        let storedUser = await AsyncStorage.getItem(LocalStorageKeys.user);
        user = JSON.parse(storedUser);
        return user
    }catch(error){
        console.log(error)
    }
    return user;
}