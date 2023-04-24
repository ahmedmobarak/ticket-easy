import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, SafeAreaView } from "react-native";
import { Local } from "../../enviroment";
import { GradBackground } from "./gradBackground";
import QRCode from "react-native-qrcode-svg"
import { Ionicons } from "@expo/vector-icons";
import { themes } from "../../themes/themes";

export function EventCard({event, theme, bookingId}){

    const [isVisible, setIsVisible] = useState(false);

    function toggleQrCode(){
        setIsVisible(!isVisible);
    }
    const QR = ({ id }) => {
        return (
            <View style={[styles.qrContainer, {backgroundColor: themes[theme].primary}]}>
                <QRCode size={330} value={id} />
                <TouchableOpacity style={{ marginTop: 40, backgroundColor: '#A0FFFF', padding: 10, borderRadius: 20 }} onPress={() => toggleQrCode()}>
                    <Text style={{ color: '#5F5F5F', fontSize: 16 }}>Close</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return(
            <SafeAreaView style={[styles.container, {backgroundColor: themes[theme].primary}]}>
                <Image source={{uri : Local.baseUrl + event.image}} style={
                    {
                        width: 150, 
                        height: 150, 
                        borderRadius: 10,
                        flex: 1
                    }} />
                <View style={{ flex: 1}}>
                     <Text style={[styles.details, {fontSize: 16, color: themes[theme].textColor}]}>{event.title}</Text>
                    <Text style={[styles.details, {color: themes[theme].textColorGray}]}>{event.location}</Text>
                    <Text style={[styles.details, {color: themes[theme].textColorGray}]}>{event.dateTime}</Text>
                    <Text style={[styles.details ,{fontSize: 16, color: themes[theme].textColorGray}]}>Normal: {event.normal} {event.vip ? ' | VIP ' + event.vip : ''}</Text>
                </View>
                {bookingId !== undefined ? <TouchableOpacity onPress={() => toggleQrCode()} style={{ left: 0 }}>
                    <Ionicons name="chevron-forward" size={24} color={themes[theme].textColor}/>
                </TouchableOpacity> : <></>}
                {
                <Modal
                        transparent={false}
                        animationType={'slide'}
                        visible={isVisible}
                        onRequestClose={() => setIsVisible(false)}
                    >
                        <GradBackground content={<QR id={bookingId} />} color1="#50995C" color2="#A0FFFFEA" />
                    </Modal>
            }
            </SafeAreaView>
           
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: '95%',
        alignItems: "center", 
        flexDirection: "row", 
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        shadowOffset: {width: 1, height: 2},
        shadowRadius: 10,
        shadowOpacity: 0.5,
        elevation: 4
    },
    details: {
        padding: 5
    },
    qrContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: '85%',
        paddingTop: 60,
        height: '60%',
        position: 'absolute',
        marginVertical: 100,
        borderRadius: 50
    }
})