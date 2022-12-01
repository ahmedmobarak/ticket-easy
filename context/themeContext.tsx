import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { useColorScheme } from "react-native";
import { LocalStorageKeys } from "../helpers/localStorageKeys";

let localTheme;
AsyncStorage.getItem(LocalStorageKeys.theme, (error, result) => {
    if(error) return(localTheme = useColorScheme())
    else localTheme = result;
})

interface ThemeContextProps{
    theme: 'light' | 'dark',
    toggleTheme: Function,
}

export const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState(localTheme);
    const toggleTheme = () => {
        AsyncStorage.setItem(LocalStorageKeys.theme, theme == 'dark' ? 'light' : 'dark');
        setTheme((current: 'light' | 'dark') => current == 'light' ? 'dark' : 'light')
    }
    return(
        <ThemeContext.Provider value={{
            theme: theme,
            toggleTheme: toggleTheme
        }}>{children}</ThemeContext.Provider>
    )
}
