import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, StatusBar, FlatList, SafeAreaView } from "react-native"
import { LangContext } from "../../context/langContext";
import { ThemeContext } from "../../context/themeContext";
import { UserContext } from "../../context/userContext";
import { bookingsApi } from "../../fetch/bookings";
import { themes } from "../../themes/themes";
import { EventCard } from "../segments/EventCard";
import { TopbarComponent } from "../segments/topbar";


export default function BookingsComponent({ navigation }) {
    const [bookings, setBookings] = useState();

    const userContext = useContext(UserContext);
    const themeContext = useContext(ThemeContext).theme;
    const langContext = useContext(LangContext);

    useEffect(() => {
        bookingsApi.getUserBookings(userContext.user.id).then((res) => setBookings(res.data))
            .catch((error) => {
                console.log('failed: ', error)
            })
    }, [])

    const Booking = ({ item }) => {
        return (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <EventCard theme={themeContext} isRtl={langContext.isRTL} bookingId={item._id} event={item.eventId} />
                    </View>
                </View>
        )
    }

    const Item = ({ booking }) => {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <EventCard theme={themeContext} isRtl={langContext.isRTL} bookingId={booking._id} event={booking.eventId} />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: StatusBar.currentHeight, direction: langContext.isRTL ? 'rtl' : 'ltr' }]}>
            <TopbarComponent navigation={navigation} />
            <View style={{ backgroundColor: themes[themeContext].primary }}>
                <FlatList
                    data={bookings}
                    renderItem={Booking}
                    keyExtractor={item => item._id}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ marginVertical: 5 }}></View>
                        )
                    }}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
        alignContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: "space-around",
        padding: 0,
        marginTop: StatusBar.currentHeight
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: 10,
        margin: 0,
        width: '100%'
    }
})