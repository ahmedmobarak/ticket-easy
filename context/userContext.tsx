import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { LocalStorageKeys } from '../helpers/localStorageKeys';
import { IUser } from '../models/user';

interface UserContextProps{
  user: IUser,
  setUser: Function
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({children}){
  const [user, setUser] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem(LocalStorageKeys.user).then(res => setUser(JSON.parse(res))).catch(err => setUser(null));
  })
  return(
    <UserContext.Provider value={{
      user: user,
      setUser: setUser
    }}>{children}</UserContext.Provider>
  )
}