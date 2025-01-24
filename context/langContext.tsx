import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { I18nManager, NativeModules } from "react-native";
import { LocalStorageKeys } from "../helpers/localStorageKeys";

interface LangContextProps{isRTL: boolean, setLanguage: Function, toggleLang: Function, lang: 'en' | 'ar'}

export const LangContext = createContext({} as LangContextProps);

export function LangProvider({children}) {
    const [isRTL, setIsRTL] = useState(false);
    const [lang, setLang] = useState('en' as 'ar' | 'en');

    useEffect(() => {
        getLang();
    }, [])
    const toggleLang = () => {
        setLang((current: 'en' | 'ar') => current == 'en' ? 'ar' : 'en')
        setIsRTL(!isRTL);
        AsyncStorage.setItem(LocalStorageKeys.lang, isRTL ? 'en' : 'ar')
    };

    function setLanguage(lang: 'en' | 'ar'){
      console.log(lang)
      setLang(lang);
      setIsRTL(lang == 'ar' ? true : false);
      AsyncStorage.setItem(LocalStorageKeys.lang, lang);
    }

    const getLang = async () => {
        try {
          const lang: any = await AsyncStorage.getItem(LocalStorageKeys.lang);
          if(lang == null || lang == undefined){
            setLang('ar');
            setIsRTL(true);
          }
          else{
            setLang(lang);
            setIsRTL(lang == 'ar' ? true : false);
          }
        } catch (error) {
         setLang('en'); 
         setIsRTL(false); 
        }
      };
    
    return(
        <LangContext.Provider value={{
            isRTL: isRTL,
            lang: lang,
            toggleLang: toggleLang,
            setLanguage: setLanguage
        }}>{children}</LangContext.Provider>
    )
}
