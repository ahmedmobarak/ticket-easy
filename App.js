import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useContext } from "react";
import { I18nManager } from "react-native";
import AppNavigator from "./components/navigators/app.navigator";
import { LangContext, LangProvider } from "./context/langContext";
import { ThemeContext, ThemeProvider } from "./context/themeContext";
import { UserProvider } from "./context/userContext";
import { LocalStorageKeys } from "./helpers/localStorageKeys";
// import registerNNPushToken from 'native-notify';

export default function App() {
  // registerNNPushToken(4809, 'I98QkChAGfL11fw7diyioB');
  const themeContext = useContext(ThemeContext);
  // console.log(langContext)
  useEffect(() => {
    try {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      console.log(I18nManager.isRTL);
    } catch (error) {
      console.log("ERROR: ", error)
    }
    AsyncStorage.getItem(LocalStorageKeys.theme, (error, result) => {
      if(error){
        AsyncStorage.setItem(LocalStorageKeys.theme, 'light', (result) => {});
        themeContext.setTheme('light')
      }
    });
    // AsyncStorage.getItem(LocalStorageKeys.lang, (error, result) => {
    //   if(error)I18nManager.forceRTL(true);
    // });
  })
  return (
    <LangProvider>
      <UserProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </UserProvider>
    </LangProvider>
  );
}