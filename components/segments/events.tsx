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

export function EventsScreen() {
    const [list, setList] = useState([] as IEvent[]);
    const [tempList, setTempList] = useState([] as IEvent[]);
    const [isLoading, setIsLoading] = useState(true);
    const [cat, setCat] = useState('concert' as 'concert' | 'match' | 'other');

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
        },
        [cat, themeContext, langContext],
    );

    // const styles = useMemo(() => createStyles('light'), [theme]);

    const Root = ({ item }: {item: IEvent}) => {
        return <Event isRtl={langContext.isRTL} item={item} />
    }

    const SearchBar = () => {
        return(
            <View style={styles.bar}>
                <TextInput style={styles.search} placeholder="Try Adele" onChangeText={(text) => search(text) }/>                   
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
            flex: 1,
            height: 50,
            maxWidth: '90%'
        },
        category: {
            paddingHorizontal: 15,
            paddingVertical: 5,
            // backgroundColor: '#AAAAAA',
            borderRadius: 20
        }
    })