import { StripeProvider } from "@stripe/stripe-react-native";
import AppNavigator from "./components/navigators/app.navigator";
import { LangProvider } from "./context/langContext";
import { ThemeProvider } from "./context/themeContext";
import { UserProvider } from "./context/userContext";
import registerNNPushToken from 'native-notify';

export default function App() {
  registerNNPushToken(4809, 'I98QkChAGfL11fw7diyioB');

  return (
    <StripeProvider publishableKey="pk_test_51PtoAj2LhJSJwQjMJYhMY3ZuZPovtxqSWG8eUrxA7WBSFN0jVod2LytaT0vRVW8Q7sDKpE4PXttvaLeE35acAHh100GxxJQ68j" merchantIdentifier="merchant.com.ahmed.sakan">
      <LangProvider>
        <UserProvider>
          <ThemeProvider>
            <AppNavigator />
          </ThemeProvider>
        </UserProvider>
      </LangProvider>
    </StripeProvider>
  );
}