import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { LocalStorageKeys } from '../helpers/localStorageKeys';
import { IUser } from '../models/user';
import App from '../App';
import { AppRoutes } from '../helpers/appRoutes';

interface UserContextProps{
  user: IUser,
  setUser: Function
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({children}){
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, [user]);
  const getUser = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem(LocalStorageKeys.user));
      if(user == null || user == undefined) return null;
      setUser(user);
    } catch (error) {
     console.log(error); 
    }
  };
  const setUserAsync = async (user) => {
    try {
      await AsyncStorage.setItem(LocalStorageKeys.user, JSON.stringify(user));
    } catch (error) {
     console.log(error); 
    }
  };
  return(
    <UserContext.Provider value={{
      user: user,
      setUser: setUser
    }}>{children}</UserContext.Provider>
  )
}