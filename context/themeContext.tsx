import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { LocalStorageKeys } from "../helpers/localStorageKeys";

interface ThemeContextProps{
    theme: Theme,
    toggleTheme: Function,
}
type Theme = 'dark' | 'light'

export const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState('dark' as Theme);
    const toggleTheme = (newTheme) => {
        AsyncStorage.setItem(LocalStorageKeys.theme, newTheme);
        setTheme((current: Theme) => current == 'light' ? 'dark' : 'light');
    }
    useEffect(() => {
        getTheme();
    }, []);
    const getTheme = async () => {
        try {
          const theme: any = await AsyncStorage.getItem(LocalStorageKeys.theme);
          if(theme == null) setTheme('light');
          else setTheme(theme);
        } catch (error) {
         setTheme('dark') 
        }
      };
    return(
        <ThemeContext.Provider value={{
            theme: theme,
            toggleTheme: toggleTheme
        }}>{children}</ThemeContext.Provider>
    )
}
