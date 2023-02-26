import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { LocalStorageKeys } from "../helpers/localStorageKeys";

interface ThemeContextProps{
    theme: 'light' | 'dark',
    toggleTheme: Function,
}

export const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState('dark' as 'dark' | 'light');
    const toggleTheme = () => {
        AsyncStorage.setItem(LocalStorageKeys.theme, theme == 'dark' ? 'light' : 'dark');
        setTheme((current: 'light' | 'dark') => current == 'light' ? 'dark' : 'light')
    }
    useEffect(() => {
        AsyncStorage.getItem(LocalStorageKeys.theme).then((res: 'dark' | 'light') => setTheme(res));
    })
    return(
        <ThemeContext.Provider value={{
            theme: theme,
            toggleTheme: toggleTheme
        }}>{children}</ThemeContext.Provider>
    )
}
