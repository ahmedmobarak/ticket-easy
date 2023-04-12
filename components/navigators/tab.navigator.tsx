import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeComponent } from "../tabs/home";
import BookingsComponent from "../tabs/bookings";
import ProfileComponent from "../tabs/profile";
import { AppRoutes } from "../../helpers/appRoutes";
import { WalletComponent } from "../tabs/wallet";

const Tab = createBottomTabNavigator();

export default function TabNav() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === AppRoutes.home) {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === AppRoutes.bookings) {
                        iconName = focused ? 'heart' : 'heart-outline';
                    }
                    else if (route.name === AppRoutes.wallet) {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                    }
                    else {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })}
        >
            <Tab.Screen name={AppRoutes.profile} component={ProfileComponent} />
            <Tab.Screen name={AppRoutes.wallet} component={WalletComponent} />
            <Tab.Screen name={AppRoutes.bookings} component={BookingsComponent} />
            <Tab.Screen name={AppRoutes.home} component={HomeComponent} />
        </Tab.Navigator>
    )
}