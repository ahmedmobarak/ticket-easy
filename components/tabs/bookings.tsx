import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, StatusBar, FlatList } from "react-native"
import { LangContext } from "../../context/langContext";
import { ThemeContext } from "../../context/themeContext";
import { UserContext } from "../../context/userContext";
import { bookingsApi } from "../../fetch/bookings";
import { themes } from "../../themes/themes";
import { EventCard } from "../segments/EventCard";
import { TopbarComponent } from "../segments/topbar";


export default function BookingsComponent({navigation}) {
    const [bookings, setBookings] = useState();

    const userContext = useContext(UserContext);
    const themeContext = useContext(ThemeContext).theme;
    const langContext = useContext(LangContext);

    useEffect(() => {       
        bookingsApi.getUserBookings(userContext.user.id).then((res) => setBookings(res.data))
            .catch((error) => {
            console.log('failed: ',error)
        })
    }, [])

    const Booking = ({item}) => {
        return(
            <Item booking={item} />
        )
    }

    const Item = ({booking}) => {
         return(
            <View>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <EventCard theme={themeContext} bookingId={booking._id} event={booking.eventId} />
                        </View>
                    </View>
            </View>
        )   
    }

    return (
        <View style={{marginTop: StatusBar.currentHeight, direction: langContext.isRTL ? 'rtl' : 'ltr'}}>
            <TopbarComponent navigation={navigation} />
        <View style={{backgroundColor: themes[themeContext].primary}}>
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

        </View>
    )
}

const styles = StyleSheet.create({
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