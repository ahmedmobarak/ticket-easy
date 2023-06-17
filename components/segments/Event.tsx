import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, ImageBackground, TouchableOpacity, StatusBar, Text, StyleSheet } from "react-native";
import { Local } from "../../enviroment";
import { AppRoutes } from "../../helpers/appRoutes";
import { IEvent } from "../../models/event";

export function Event({ item, isRtl }: { item: IEvent, isRtl: boolean }) {
    const checkout = (navigation, item) => {
        navigation.navigate(AppRoutes.checkout, {
            itemId: 1,
            event: item
        })
    };
    const navigation = useNavigation();
    return (
        <View style={[styles.container, {direction: isRtl ? 'rtl' : 'ltr'}]}>
            <ImageBackground style={styles.img} source={{ uri: Local.baseUrl + item.image }}>
                <View style={[styles.description, {alignItems: 'flex-start', flexDirection: isRtl ? 'row' : 'row-reverse'}]}>
                    <View style={{ display: 'flex', flex: 7, marginStart: 0.5, alignItems: isRtl ? 'flex-end' : 'flex-start', width: '100%' }}>
                        <Text style={{ textAlign: 'left', fontSize: 22, fontWeight: 'bold', color: 'white' }}>{item.title}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row'}}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name="pin-outline" size={14} color={"white"} />
                                <Text style={{ textAlign: isRtl ? 'right' : 'left', fontSize: 12, color: 'white' }}>{item.location} </Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name="calendar-outline" size={14} color={"white"} />
                                <Text style={{ textAlign: isRtl ? 'right' : 'left', fontSize: 12, color: 'white' }}> {item.dateTime}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.btn, {flex: 1, position: 'absolute', alignSelf: 'center', marginEnd: isRtl ? 0 : 5, marginStart: isRtl ? 5 : 0}]}
                        onPress={() => checkout(navigation, item)}
                    >
                        <Ionicons name={isRtl ? "chevron-back" : "chevron-forward"} color={"tomato"} size={32} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
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
        alignContent: 'center'
    },
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        // backgroundColor: '#FFFFFF',
        borderRadius: 15,
        overflow: 'hidden',
    },
    bar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight
    },
    img: {
        width: 380,
        height: 500,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    description: {
        display: 'flex',
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        backfaceVisibility: 'hidden',
        // backgroundColor: 'rgba(255, 99, 71, 0.7)',
        backgroundColor: 'tomato',
        padding: 10,
        bottom: 15,
        borderRadius: 50,
    },
    text: {
        color: 'white'
    },
    btn: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 60,
        height: 60,
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    search: {
        color: 'tomato',
        paddingHorizontal: 15,
        paddingVertical: 5,
        margin: 10,
        // minWidth: '65%',
        borderColor: 'tomato',
        borderWidth: 1,
        borderRadius: 25,
        flex: 3
    },
    category: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        // backgroundColor: '#AAAAAA',
        borderRadius: 20
    }
})