import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { I18nManager, NativeModules } from "react-native";
import { LocalStorageKeys } from "../helpers/localStorageKeys";

interface LangContextProps{isRTL: boolean, toggleLang: Function, lang: 'en' | 'ar'}

export const LangContext = createContext({} as LangContextProps);

export function LangProvider({children}) {
    const [isRTL, setIsRTL] = useState(false);
    const [lang, setLang] = useState('en' as 'ar' | 'en');

    const toggleLang = () => {
        setLang((current: 'en' | 'ar') => current == 'en' ? 'ar' : 'en')
        setIsRTL(!isRTL);
        AsyncStorage.setItem(LocalStorageKeys.lang, isRTL ? 'en' : 'ar')
    }

    useEffect(() => {
        AsyncStorage.getItem(LocalStorageKeys.lang).then((res: 'ar' | 'en') => {
            setLang(res); setIsRTL(res == 'ar' ? true : false)
        }).catch(err =>{ setLang('ar'); setIsRTL(false)})
        console.log(lang)
    }, [lang])
    
    return(
        <LangContext.Provider value={{
            isRTL: isRTL,
            lang: lang,
            toggleLang: toggleLang,
        }}>{children}</LangContext.Provider>
    )
}
