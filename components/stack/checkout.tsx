import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { LangContext } from "../../context/langContext";
import { ThemeContext } from "../../context/themeContext";
import { UserContext } from "../../context/userContext";
import { Local } from "../../enviroment";
import { bookingsApi } from "../../fetch/bookings";
import { ApiRoutes } from "../../helpers/apiRoutes";
import { AppRoutes } from "../../helpers/appRoutes";
import { lang } from "../../i18n/lang";
import { CardBookingData, WalletBookingData } from "../../models/bookingData";
import { IEvent } from "../../models/event";
import { themes } from "../../themes/themes";
import { CustomText } from "../custom/text";
import { EventCard } from "../segments/EventCard";

export default function CheckoutComponent({route, navigation}){
    const [seats, setSeats] = useState(0);
    const [cardNo, setCardNo] = useState(null as number);
    const [type, setType] = useState('normal');
    const [pin, setPin] = useState();
    const [payment, setPayment] = useState('wallet');

    const cardBookingData = {cardNo: cardNo, pin: pin, type: type, payment: payment, seats: seats} as CardBookingData;

    const walletBookingData = {seats: seats, type: type, payment: payment} as WalletBookingData;

    const event: IEvent = route.params.event;

    const userContext = useContext(UserContext);
    const langContext = useContext(LangContext);
    const themeContext = useContext(ThemeContext).theme;

    const bookByCard = () => {
        bookingsApi.bookByCard({event: event, cardBooingData: cardBookingData, userId: userContext.user.id}).then((res) => {
            console.log(res)
            navigation.navigate(AppRoutes.bookings)
        }).catch((error) => {
            console.log(error)
        })
    }

    const bookByWallet = () => {
        bookingsApi.bookByWallet({event: event, walletBookingData: walletBookingData, userId: userContext.user.id}).then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }
    

    return(
        <ScrollView style={[styles.container, {marginTop: StatusBar.currentHeight, backgroundColor: themes[themeContext].primary, direction: langContext.isRTL ? 'rtl' : 'ltr'}]}>
            <View style={{padding: 15, flexDirection: 'row', direction: 'ltr'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons size={30} name="chevron-back"></Ionicons></TouchableOpacity>
                <CustomText isGray={false} isRTL={langContext.isRTL} theme={themeContext}>{lang[langContext.lang].titles.checkout}</CustomText>
            </View>
            <EventCard theme={themeContext} event={event} bookingId={undefined} />
            {event.vip !== undefined ? (
                <View style={{marginTop: 15}}>
                    <Text style={{color: themes[themeContext].textColor}}>{lang[langContext.lang].lables.ticketType}</Text>
                    <View style={[styles.btnGroup, {flexDirection: 'row'}]}>
                        <TouchableOpacity style={[styles.tab, {backgroundColor: type == 'normal' ? themes.dark.orange : '', borderBottomLeftRadius: 25}]} onPress={() => setType('normal')}><Text style={{color: '#FFFFFF'}}>{lang[langContext.lang].btnTitles.normal} {event.normal}</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.tab, {backgroundColor: type == 'vip' ? themes.dark.orange : '', borderBottomRightRadius: 25}]} onPress={() => setType('vip')}><Text style={{color: '#FFFFFF'}}>{lang[langContext.lang].btnTitles.vip} {event.vip}</Text></TouchableOpacity>
                    </View>
                </View>
            ) : ''
        }
            
            <View style={{marginVertical: 20}}>
                <Text style={{color: themes[themeContext].textColor}}>{lang[langContext.lang].lables.noOfSeats}</Text>
                <TextInput style={[styles.input, {minHeight: 40}]} placeholderTextColor={'grey'} placeholder="1~5" onChangeText={setSeats} />
                
            </View>
            <View style={[styles.btnGroup, {flexDirection: 'row'}]}>
                <TouchableOpacity onPress={() => setPayment('wallet')} style={[styles.tab, {borderBottomColor: themes[themeContext].textColor, backgroundColor: payment === 'wallet' ? themes.dark.orange : ''}]}><Text style={{color: themes[themeContext].textColor}}>{lang[langContext.lang].btnTitles.bookWithWallet}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setPayment('card')} style={[styles.tab, {borderBottomColor: themes[themeContext].textColor, backgroundColor: payment === 'card' ? themes.dark.orange : '' }]}><Text style={{color: themes[themeContext].textColor}}>{lang[langContext.lang].btnTitles.bookWithCard}</Text></TouchableOpacity>
            </View>
            <View>
                {payment === 'wallet' ? 
                <View style={{paddingVertical: 10}}>
                    <Text style={{color: themes[themeContext].textColor}}>{lang[langContext.lang].lables.wallet}</Text>
                    <Text style={{color: themes[themeContext].textColor}}>Pay with Wallet</Text>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={() => bookByWallet()}>
                            <Text style={{color: 'white', fontSize: 18}}>{lang[langContext.lang].btnTitles.bookWithWallet} {type == 'normal' ? seats * event.normal :  seats * event.vip}</Text>
                    </TouchableOpacity>
                </View> :
                <View style={{paddingVertical: 10}}>
                    <Text style={{color: themes[themeContext].textColor}}>{lang[langContext.lang].btnTitles.bookWithCard}</Text>
                    <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="ATM card number" onChangeText={setCardNo} />
                    <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="PIN" onChangeText={setPin} />
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={() => bookByCard()}>
                            <Text style={{color: 'white', fontSize: 18}}>{lang[langContext.lang].btnTitles.bookWithCard} {type == 'normal' ? seats * event.normal :  seats * event.vip}</Text>
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
        backgroundColor: 'tomato',
        borderRadius: 40,
        shadowColor: '#333333',
        shadowOffset: {width: 1, height: 2},
        shadowRadius: 10,
        shadowOpacity: 0.5
    }
})