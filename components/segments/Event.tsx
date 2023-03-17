import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, ImageBackground, TouchableOpacity, StatusBar, Text, StyleSheet } from "react-native";
import { Local } from "../../enviroment";
import { AppRoutes } from "../../helpers/appRoutes";
import { IEvent } from "../../models/event";
import checkout from "../stack/checkout";

export function Event({ item }: { item: IEvent }, isRtl) {
    const checkout = (navigation, item) => {
        console.log(item);

        navigation.navigate(AppRoutes.checkout, {
            itemId: 1,
            event: item
        })
    };
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.img} source={{ uri: Local.baseUrl + item.image }}>
                <View style={styles.description}>
                    <View>
                        <Text style={{ fontFamily: 'sans-serif', fontSize: 24, fontWeight: 'bold', color: 'white' }}>{item.title}</Text>
                        <Text style={{ color: 'white' }}>{item.location} | {item.dateTime}</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.btn, {}]}
                        onPress={() => checkout(navigation, item)}
                    >
                        <Ionicons name={isRtl ? "chevron-back" : "chevron-forward"} color={"tomato"} size={32} />
                        {/* <Text style={{ color: 'tomato', fontSize: 18, fontWeight: 'bold' }}>Book</Text> */}
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
        flexDirection: 'row',
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
        paddingHorizontal: 10,
        left: 0
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