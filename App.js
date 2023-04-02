import AppNavigator from "./components/navigators/app.navigator";
import { LangProvider } from "./context/langContext";
import { ThemeProvider } from "./context/themeContext";
import { UserProvider } from "./context/userContext";
// import registerNNPushToken from 'native-notify';

export default function App() {
  // registerNNPushToken(4809, 'I98QkChAGfL11fw7diyioB');

  // AsyncStorage.setItem(LocalStorageKeys.lang, 'en');
  // AsyncStorage.setItem(LocalStorageKeys.theme, 'light');

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