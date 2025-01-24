import React, { useEffect, useState, useContext } from "react";
import { FlatList, SafeAreaView, Text, View, Image, StyleSheet, StatusBar, TextInput, TouchableOpacity } from "react-native";
import { IEvent } from '../../models/event'
import { LoadingComponent } from "./loading";
import { Event } from "./Event";
import { themes } from "../../themes/themes";
import { ThemeContext } from "../../context/themeContext";
import { LangContext } from "../../context/langContext";
import { lang } from "../../i18n/lang";
import { EventsApi } from "../../fetch/events";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { LookupAPI } from "../../fetch/lookup";

export function EventsScreen() {
    const [list, setList] = useState([] as IEvent[]);
    const [tempList, setTempList] = useState([] as IEvent[]);
    const [isLoading, setIsLoading] = useState(true);
    const [cat, setCat] = useState('concert' as 'concert' | 'match' | 'venue' | 'other');
    const [categoriesList, setCategoriesList] = useState([]);

    const themeContext = useContext(ThemeContext);
    const langContext = useContext(LangContext);

    useEffect(() => {
            EventsApi.getEvents(cat, langContext.lang).then(function (res) {
                setList(res.data);
                setTempList(res.data);
                setIsLoading(false);
            }).catch(function (error) {
                setIsLoading(false);
                return error
            });
            LookupAPI.getEventTypes().then((res) => {
                setCategoriesList(res.data);
            }).catch((error) => {
                return error
            });
        },
        [cat, themeContext, langContext],
    );

    const navigation: any = useNavigation();

    // const styles = useMemo(() => createStyles('light'), [theme]);

    const Root = ({ item }: {item: IEvent}) => {
        return <Event isRtl={langContext.isRTL} item={item} />
    }

    const SearchBar = ({artist}) => {
        return(
            <View style={styles.bar}>
                <TextInput style={[styles.search, {backgroundColor: themes[themeContext.theme].accent}]} placeholderTextColor={'white'} placeholder={`Try Adele`} onChangeText={(text) => search(text) }/>                   
                <IconButton icon={'map'} iconColor={'#27cc7f'} size={20} onPress={() => navigation.navigate('Map')} />
            </View>
        )
    }

    const search = (text: string) => {
        let filtered = list.filter(item => 
            item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()) 
            || item.artist?.toLocaleLowerCase().includes(text.toLocaleLowerCase())
            );
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
            <SearchBar artist={'Adele'} />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                marginBottom: 10
            }}>
                {categoriesList.map(catType => (
                    <TouchableOpacity key={catType.id} onPress={() => setCat(catType.id)} style={[styles.category, {backgroundColor: cat == catType.id ? themes.dark.mixed : themes.dark.orange}]}>
                    <Ionicons color={"white"} name={catType.icon} size={18} />
                    <Text style={{color: "white"}}>{lang[langContext.lang].titles[catType.id]}</Text>
                    </TouchableOpacity>
                ))}
                
                {/* <TouchableOpacity onPress={() => setCat('venue')} style={[styles.category, {backgroundColor: cat == 'venue' ? themes.dark.mixed : themes.dark.orange}]}>
                    <Ionicons color={"white"} name="location-outline" size={18} />
                    <Text style={{color: "white"}}>{lang[langContext.lang].titles.venues}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setCat('match')} style={[styles.category, {backgroundColor: cat == 'match' ? themes.dark.mixed : themes.dark.orange}]}>
                    <Ionicons color={"white"} name="football-outline" size={18} />
                    <Text style={{color: "white"}}>{lang[langContext.lang].titles.matches}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setCat('other')} style={[styles.category, {backgroundColor: cat == 'other' ? themes.dark.mixed : themes.dark.orange}]}>
                    <Ionicons color={"white"} name="ellipsis-vertical-outline" size={18} />
                    <Text style={{color: "white"}}>{lang[langContext.lang].titles.other}</Text></TouchableOpacity> */}
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
            color: 'white',
            backgroundColor: '#D1D1D1',
            elevation: 4,
            paddingHorizontal: 15, 
            paddingVertical: 5, 
            margin: 10, 
            // minWidth: '65%',
            borderColor: 'transparent', 
            borderWidth: 1, 
            borderRadius: 25,
            flex: 1,
            height: 50,
            maxWidth: '90%'
        },
        category: {
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 5,
            // backgroundColor: '#AAAAAA',
            borderRadius: 20
        }
    })