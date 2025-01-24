import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert, ActivityIndicator } from "react-native";
import { LangContext } from "../../context/langContext";
import { ThemeContext } from "../../context/themeContext";
import { UserContext } from "../../context/userContext";
import { bookingsApi } from "../../fetch/bookings";
import { AppRoutes } from "../../helpers/appRoutes";
import { lang } from "../../i18n/lang";
import { CardBookingData, WalletBookingData } from "../../models/bookingData";
import { IEvent } from "../../models/event";
import { themes } from "../../themes/themes";
import { CustomText } from "../custom/text";
import { EventCard } from "../segments/EventCard";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useStripe } from "@stripe/stripe-react-native";
import { Local } from "../../enviroment";
import axios from "axios";

export default function CheckoutComponent({ route, navigation }) {
    const [seats, setSeats] = useState(1);
    const [cardNo, setCardNo] = useState(null as number);
    const [type, setType] = useState('normal');
    const [pin, setPin] = useState();
    const [payment, setPayment] = useState('wallet');
    const [amount, setAmount] = useState(0);
    const [publishableKey, setPublishableKey] = useState('pk_test_51PtoAj2LhJSJwQjMJYhMY3ZuZPovtxqSWG8eUrxA7WBSFN0jVod2LytaT0vRVW8Q7sDKpE4PXttvaLeE35acAHh100GxxJQ68j');

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
    const [clientSecret, setClientSecret] = useState<string>();

    const fetchPaymentSheetParams = async () => {
        setLoading(true);
        const response = await axios.post(`${Local.baseUrl}payment-sheet`, { currency: 'aed', amount: amount });
        setLoading(false);
        const { paymentIntent, ephemeralKey, customer } = response.data;
        setClientSecret(paymentIntent);
        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Ticketz, Inc.",
            customerId: customer,
            style: 'alwaysDark',
            customFlow: false,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
                address: { country: 'AE' }
            }
        });
        openPaymentSheet();
        if (!error) {
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        // if (!clientSecret) {
        //     Alert.alert("Error", "Payment setup is incomplete");
        //     return;
        // }

        try {
            setLoading(true);

            const { error } = await presentPaymentSheet();

            if (error) {
                Alert.alert(`Error code: ${error.code}`, error.message);
            } else {
                Alert.alert('Success', 'The payment was confirmed successfully');
                setPaymentSheetEnabled(false);
            }
        } catch (e) {
            console.error("Error presenting payment sheet:", e);
            Alert.alert("Error", "Something went wrong while presenting the payment sheet");
        } finally {
            setLoading(false);
        }
    };

    const cardBookingData = { cardNo: cardNo, pin: pin, type: type, payment: payment, seats: seats } as CardBookingData;

    const walletBookingData = { seats: seats, type: type, payment: payment } as WalletBookingData;

    const event: IEvent = route.params.event;

    const userContext = useContext(UserContext);
    const langContext = useContext(LangContext);
    const themeContext = useContext(ThemeContext).theme;

    const bookByCard = () => {
        initializePaymentSheet();
        // bookingsApi.bookByCard({event: event, cardBooingData: cardBookingData, userId: userContext.user.id}).then((res) => {
        //     navigation.navigate(AppRoutes.bookings)
        // }).catch((error) => {
        //     console.log(error)
        // })
    }

    const bookByWallet = () => {
        bookingsApi.bookByWallet({ event: event, walletBookingData: walletBookingData, userId: userContext.user.id }).then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }

    const onSeatsChange = (e) => {
        let v = parseInt(e);
        console.log(e)
        setSeats(v);
        setAmount(type == 'normal' ? v * event.normal : v * event.vip)
    }


    return (
        <ScrollView style={[styles.container, { marginTop: StatusBar.currentHeight, backgroundColor: themes[themeContext].primary, direction: langContext.isRTL ? 'rtl' : 'ltr' }]}>
            <ExpoStatusBar translucent={true} backgroundColor={themes[themeContext].primary} style='auto' />
            <View style={{ padding: 5, flexDirection: 'row', direction: langContext.isRTL ? 'rtl' : 'ltr', alignSelf: langContext.isRTL ? 'flex-start' : 'flex-end' }}>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.goBack()}><Ionicons size={30} color={themes[themeContext].textColor} name={langContext.isRTL ? "chevron-back" : "chevron-forward"}></Ionicons></TouchableOpacity>
            </View>
            <EventCard theme={themeContext} event={event} bookingId={undefined} />
            {event.vip !== undefined ? (
                <View style={{ marginTop: 15 }}>
                    <Text style={{ color: themes[themeContext].textColor }}>{lang[langContext.lang].lables.ticketType}</Text>
                    <View style={[styles.btnGroup, { flexDirection: 'row' }]}>
                        <TouchableOpacity style={[styles.tab, { backgroundColor: type == 'normal' ? themes.dark.orange : '#DC5076', borderBottomLeftRadius: 25 }]} onPress={() => setType('normal')}><Text style={{ color: '#FFFFFF' }}>{lang[langContext.lang].btnTitles.normal} {event.normal}</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.tab, { backgroundColor: type == 'vip' ? themes.dark.orange : '#DC5076', borderBottomRightRadius: 25 }]} onPress={() => setType('vip')}><Text style={{ color: '#FFFFFF' }}>{lang[langContext.lang].btnTitles.vip} {event.vip}</Text></TouchableOpacity>
                    </View>
                </View>
            ) : ''
            }

            <View style={{ marginVertical: 20 }}>
                <Text style={{ color: themes[themeContext].textColor }}>{lang[langContext.lang].lables.noOfSeats}</Text>
                <TextInput style={[styles.input, { minHeight: 40 }]} placeholderTextColor={'grey'} keyboardType="numeric" placeholder="1~5" onChangeText={(e) => onSeatsChange(e)} />

            </View>
            <View style={[styles.btnGroup, { flexDirection: 'row' }]}>
                <TouchableOpacity onPress={() => setPayment('wallet')} style={[styles.tab, { borderBottomColor: themes[themeContext].textColor, backgroundColor: payment === 'wallet' ? themes.dark.orange : '#DC5076' }]}><Text style={{ color: 'white' }}>{lang[langContext.lang].btnTitles.bookWithWallet}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setPayment('card')} style={[styles.tab, { borderBottomColor: themes[themeContext].textColor, backgroundColor: payment === 'card' ? themes.dark.orange : '#DC5076' }]}><Text style={{ color: 'white' }}>{lang[langContext.lang].btnTitles.bookWithCard}</Text></TouchableOpacity>
            </View>
            <View>
                {payment === 'wallet' ?
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={{ color: themes[themeContext].textColor }}>{lang[langContext.lang].lables.wallet}</Text>
                        <Text style={{ color: themes[themeContext].textColor }}>Pay with Wallet</Text>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => bookByWallet()}>
                            <Text style={{ color: 'white', fontSize: 18 }}>{lang[langContext.lang].btnTitles.bookWithWallet} {amount}</Text>
                        </TouchableOpacity>
                    </View> :
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={{ color: themes[themeContext].textColor }}>{lang[langContext.lang].btnTitles.bookWithCard}</Text>
                        <TouchableOpacity
                            disabled={loading || amount < 1}
                            style={styles.btn}
                            onPress={() => bookByCard()}>
                            <ActivityIndicator size="small" color={themes[themeContext].pink} animating={loading} />
                            <Text style={{ color: 'white', fontSize: 18 }}>{lang[langContext.lang].btnTitles.bookWithCard} {type == 'normal' ? seats * event.normal : seats * event.vip}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        backgroundColor: 'white',
        height: '100%'
    },
    details: {
        padding: 5
    },
    input: {
        padding: 15,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#CACACA',
        minHeight: 40
    },
    tab: {
        padding: 15,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    btnGroup: {
        borderRadius: 40,
        backgroundColor: themes.dark.mixed,
        padding: 10
    },
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row',
        gap: 10,
        backgroundColor: 'tomato',
        borderRadius: 40,
        shadowColor: '#333333',
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 10,
        shadowOpacity: 0.5
    }
})