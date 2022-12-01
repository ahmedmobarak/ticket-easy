import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';
import { LocalStorageKeys } from '../helpers/localStorageKeys';
import { IUser } from '../models/user';

let initialState;
AsyncStorage.getItem(LocalStorageKeys.user, (error, result) => {
  console.log(result)
  if(error) return initialState = undefined;
  else initialState = JSON.parse(result);
})

interface UserContextProps{
  user: IUser,
  setUser: Function
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({children}){
  const [user, setUser] = useState(initialState);
  return(
    <UserContext.Provider value={{
      user: user,
      setUser: setUser
    }}>{children}</UserContext.Provider>
  )
}