import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FlatList, SafeAreaView, Text, View, Image, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { IEvent } from '../../models/event'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Local } from "../../enviroment";
import { ApiRoutes } from "../../helpers/apiRoutes";
import { AppRoutes } from "../../helpers/appRoutes";
import { LoadingComponent } from "./loading";
import { LocalStorageKeys } from "../../helpers/localStorageKeys";
import { themes } from "../../themes/themes";
import { ThemeContext } from "../../context/themeContext";
import { LangContext } from "../../context/langContext";
import { lang } from "../../i18n/lang";

export function EventsScreen() {
    const [list, setList] = useState([] as IEvent[]);
    const [tempList, setTempList] = useState([] as IEvent[]);
    const [theme, setTheme] = useState(String);
    const [isLoading, setIsLoading] = useState(true);
    const [cat, setCat] = useState('concert' as 'concert' | 'match' | 'other');

    const themeContext = useContext(ThemeContext);
    const langContext = useContext(LangContext);
    if(themeContext == undefined) themeContext == 'light';

    useEffect(() => {
            axios.get(Local.baseUrl + ApiRoutes.events.main + cat).then(function (res) {
                setList(res.data);
                setTempList(res.data);
                setIsLoading(false);
            }).catch(function (error) {
                setIsLoading(false);
                return error
            });
        },
        [cat, themeContext, langContext],
    );

    // const styles = useMemo(() => createStyles('light'), [theme]);

    const Root = ({ item }) => {
        return <Event item={item} />
    }

    const Event = ({ item }) => {
        const navigation = useNavigation();
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.img} source={{ uri: Local.baseUrl + item.image }}>
                    <View style={styles.description}>
                        <View>
                            <Text style={{ fontFamily: 'sans-serif', fontSize: 24, fontWeight: 'bold', color: 'white' }}>{item.title}</Text>
                            <Text style={{ color: 'white' }}>{item.location} | {item.dateTime}</Text>
                        </View>
                        <TouchableOpacity style={styles.btn}
                            onPress={() => navigation.navigate(AppRoutes.checkout, {
                                itemId: 1,
                                event: item
                            })}
                        >
                           <Ionicons name={!langContext.isRTL ? "chevron-forward" : "chevron-back"} color={"tomato"} size={32} />
                            {/* <Text style={{ color: 'tomato', fontSize: 18, fontWeight: 'bold' }}>Book</Text> */}
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    const SearchBar = () => {
        return(
            <View style={styles.bar}>
                <Image style={{flex: 1, width: 50, height: 50}} source={require('../../assets/logo.png')} />
                <TextInput style={styles.search} placeholder="Try Adele" onChangeText={(text) => search(text) }/>                   
                <Ionicons style={
                    {
                        flex: 1,
                    }
                } name="bulb" size={34} />
            </View>
        )
    }

    const search = (text: string) => {
        let filtered = list.filter(item => item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || item.artist?.toLocaleLowerCase().includes(text.toLocaleLowerCase()));
        if (text === '') {
            return setTempList(list)
        }
        else {
            return setTempList(filtered);
        }
    }

    if(isLoading) {
        return(
            <LoadingComponent />
        )
    }

    else return (
        <SafeAreaView style={[styles.safeArea, {backgroundColor: themes[themeContext.theme].primary, direction: langContext.isRTL ? 'rtl' : 'ltr'}]}>
            <SearchBar />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                marginBottom: 10
            }}>
                <TouchableOpacity onPress={() => setCat('concert')} style={[styles.category, {backgroundColor: cat == 'concert' ? '#D3D3D3' : '#787878'}]}><Text>{lang[langContext.lang].titles.concerts}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setCat('match')} style={[styles.category, {backgroundColor: cat == 'match' ? '#D3D3D3' : '#787878'}]}><Text>{lang[langContext.lang].titles.matches}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setCat('other')} style={[styles.category, {backgroundColor: cat == 'other' ? '#D3D3D3' : '#787878'}]}><Text>{lang[langContext.lang].titles.other}</Text></TouchableOpacity>
            </View>
            <FlatList
                data={tempList}
                renderItem={Root}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ margin: 10 }}></View>
                    )
                }}
            />
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
            justifyContent: 'space-around',
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