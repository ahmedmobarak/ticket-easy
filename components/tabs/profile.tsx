import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { IUser } from "../../models/user";
import { TopbarComponent } from "../segments/topbar";
import { LocalStorageKeys } from "../../helpers/localStorageKeys";
import { AppRoutes } from "../../helpers/appRoutes";
import { UserContext } from "../../context/userContext";
import { ThemeContext } from "../../context/themeContext";
import { themes } from "../../themes/themes";
import { LangContext } from "../../context/langContext";
import { CustomText } from "../custom/text";
import { lang } from "../../i18n/lang";

export default function ProfileComponent({ navigation }) {
    const [isEditing, setIsEditing] = useState(false);
    
    const user: IUser = useContext(UserContext).user;
    const themeContext: 'light' | 'dark' = useContext(ThemeContext).theme;
    const langContext = useContext(LangContext);

    function logout() {
        AsyncStorage.removeItem(LocalStorageKeys.user).then(l => navigation.navigate(AppRoutes.login));
    }
    return (
        <ScrollView style={{marginTop: StatusBar.currentHeight, direction: langContext.isRTL ? 'rtl' : 'ltr', width: '100%', height: '100%', backgroundColor: themes[themeContext].primary}}>
        <TopbarComponent navigation={navigation} />
        <View style={[styles.container]}>
            <View style={
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }
            }>
                <Ionicons name="person-circle" color={themes[themeContext].textColor} size={160}></Ionicons>
            </View>
            <View style={[styles.info, {backgroundColor: themes[themeContext].accent}]}>
                <View style={{display: "flex", flexDirection: 'row', padding: 10, backgroundColor: themes.dark.textColorGray, borderRadius: 40}}>
                    <TouchableOpacity onPress={() => setIsEditing(true)} style={[styles.btnGroup, { backgroundColor: isEditing ? '#9EC0FF' : '' }]}><Ionicons name="pencil" size={26} /><Text>{lang.ar.btnTitles.edit}</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsEditing(false)} style={[styles.btnGroup, { backgroundColor: !isEditing ? '#9EC0FF' : '' }]}><Ionicons name="disc" size={26} /><Text>{lang.ar.btnTitles.cancel}</Text></TouchableOpacity>
                </View>
                <TextInput textAlign={langContext.isRTL ? 'right' : 'left'} defaultValue={user?.name} editable={isEditing} style={[styles.input, {textAlign: langContext.isRTL ? 'right' : 'left'}]} />
                <TextInput textAlign={langContext.isRTL ? 'right' : 'left'} defaultValue={user?.email} keyboardType="email-address" editable={isEditing} style={[styles.input, {textAlign: langContext.isRTL ? 'right' : 'left'}]} />
                <TextInput textAlign={langContext.isRTL ? 'right' : 'left'} defaultValue={user?.phone} keyboardType="phone-pad" textContentType="telephoneNumber" editable={isEditing} style={[styles.input, {textAlign: langContext.isRTL ? 'right' : 'left'}]} />
                <TouchableOpacity disabled={!isEditing} style={styles.saveBtn} onPress={() => logout()}>
                    <CustomText isRTL={langContext.isRTL} isGray={false} theme={themeContext}>{lang[langContext.lang].btnTitles.save}</CustomText>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        height: '100%'
    },
    info: {
        display: 'flex',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 20,
        borderWidth: 0.1,
        borderColor: '#B6B6B6B4',
        elevation: 5,
        height: '70%',
        justifyContent: 'space-between'
    },
    logoutBtn: {
        backgroundColor: '#333',
        padding: 10
    },
    saveBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#53B668',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 20
    },
    input: {
        padding: 15,
        borderRadius: 30,
        borderColor: '#AAAAAA',
        borderWidth: 1,
        width: 350,
        marginVertical: 4
    },
    btnGroup: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 1,
        width: '49%',
        borderRadius: 20
    }
})