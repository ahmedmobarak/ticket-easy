import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Image, Text, StyleSheet, TouchableOpacity, View, StatusBar } from "react-native";
import { ThemeContext } from "../../context/themeContext";
import { LangContext } from "../../context/langContext";
import { AppRoutes } from "../../helpers/appRoutes";
import { LocalStorageKeys } from "../../helpers/localStorageKeys";
import { themes } from "../../themes/themes";
import { CustomText } from "../custom/text";
import { lang } from "../../i18n/lang";

export function TopbarComponent({navigation}){
    const [isVisible, setIsVisible] = useState(false);

    const themeContext = useContext(ThemeContext);
    const langContext = useContext(LangContext);

    const toggleDropdown = () => {
        setIsVisible(!isVisible);
    }
    function logout() {
        AsyncStorage.removeItem(LocalStorageKeys.user).then(l => navigation.navigate(AppRoutes.login));
    }
    function toggleTheme(){
        let newTheme = themeContext.theme == 'dark' ? 'light' : 'dark';
        themeContext.toggleTheme(newTheme);
    }
    function toggleLang(){
        langContext.toggleLang()
    }
    const menu = () => {
        if(isVisible){
        return(
            <View style={[styles.menu, { direction: langContext.isRTL ? 'rtl' : 'ltr', marginStart: langContext.isRTL ? -100 : 2, backgroundColor: themes[themeContext.theme].primary}]}>
                    <TouchableOpacity onPress={() => toggleTheme()} style={[styles.row, { flexDirection: langContext.isRTL ? 'row-reverse' : 'row', alignSelf: langContext.isRTL ? 'flex-end' : 'flex-start'}]}>
                        <Ionicons style={{marginEnd: 10, color: themes[themeContext.theme].textColor}} size={16} name="bulb"></Ionicons>
                        <CustomText size={16} isRTL={langContext.isRTL} theme={themeContext.theme} isGray={true}>{lang[langContext.lang].menu.theme[themeContext.theme]}</CustomText> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleLang()} style={[styles.row, { flexDirection: langContext.isRTL ? 'row-reverse' : 'row', alignSelf: langContext.isRTL ? 'flex-end' : 'flex-start'}]}>
                        <Ionicons style={{marginEnd: 10, color: themes[themeContext.theme].textColor}} size={16} name="globe"></Ionicons>
                        <CustomText size={16} isRTL={langContext.isRTL} theme={themeContext.theme} isGray={true}>{lang[langContext.lang].menu.lang[langContext.lang]}</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row, { flexDirection: langContext.isRTL ? 'row-reverse' : 'row', alignSelf: langContext.isRTL ? 'flex-end' : 'flex-start'}]}>
                        <Ionicons style={{marginEnd: 10, color: themes[themeContext.theme].textColor}} size={16} name="leaf"></Ionicons>
                        <CustomText size={16} isRTL={langContext.isRTL} theme={themeContext.theme} isGray={true}>{lang[langContext.lang].menu.temrs}</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row, { flexDirection: langContext.isRTL ? 'row-reverse' : 'row', alignSelf: langContext.isRTL ? 'flex-end' : 'flex-start'}]}>
                        <Ionicons style={{marginEnd: 10, color: themes[themeContext.theme].textColor}} size={16} name="earth"></Ionicons>
                        <CustomText size={16} isRTL={langContext.isRTL} theme={themeContext.theme} isGray={true}>{lang[langContext.lang].menu.about}</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row, { flexDirection: langContext.isRTL ? 'row-reverse' : 'row', alignSelf: langContext.isRTL ? 'flex-end' : 'flex-start'}]} onPress={logout}>
                        <Ionicons style={{marginEnd: 10, color: themes[themeContext.theme].textColor}} size={16} name="log-out"></Ionicons>
                        <CustomText size={16} isRTL={langContext.isRTL} theme={themeContext.theme} isGray={true}>{lang[langContext.lang].btnTitles.logout}</CustomText>
                    </TouchableOpacity>
            </View>
        )
        }
    }
    return(
        <View style={[styles.container, {backgroundColor: themes[themeContext.theme].primary, direction: langContext.isRTL ? 'rtl' : 'ltr', flexDirection: langContext.isRTL ? 'row' : 'row-reverse'}]}>
            <Image style={styles.img} source={require('../../assets/logo.png')} />
            <TouchableOpacity onPress={toggleDropdown}>
                <Ionicons color={themes[themeContext.theme].textColor} name="menu-outline" size={36} />
                {menu()}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Roboto',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 2,
        paddingHorizontal: 20
    },
    img: {
        width: 60,
        height: 60,
        alignSelf: 'flex-start',
        marginStart: 0 
    },
    btn : {
        alignSelf: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'flex-end'
    },
    menu: {
        position: 'absolute',
        marginTop: 40,
        padding: 5,
        width: '400%',
        alignSelf: 'flex-start',
        borderWidth: 0.2,
        borderColor: '#A0A0A0',
        borderRadius: 5,
        alignItems: 'flex-start'
    },
    row: {
        // flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})