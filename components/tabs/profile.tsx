import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, StatusBar, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { IUser } from "../../models/user";
import { TopbarComponent } from "../segments/topbar";
import { UserContext } from "../../context/userContext";
import { ThemeContext } from "../../context/themeContext";
import { themes } from "../../themes/themes";
import { LangContext } from "../../context/langContext";
import { CustomText } from "../custom/text";
import { lang } from "../../i18n/lang";
import { AuthApi } from "../../fetch/auth";

export default function ProfileComponent({ navigation }) {
    const user = useContext(UserContext);

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user.user as IUser);
    
    const themeContext: 'light' | 'dark' = useContext(ThemeContext).theme;
    const langContext = useContext(LangContext);

    function updateUser(){
        console.log(editedUser)
        AuthApi.updateUserInfo(editedUser).then(res => user.setUser(res.data)).catch(error => console.log(error))
    }
    return (
        <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>

        <ScrollView contentContainerStyle={{height: '100%'}} style={{ minHeight: '100%', direction: langContext.isRTL ? 'rtl' : 'ltr', width: '100%', height: '100%', backgroundColor: themes[themeContext].primary}}>
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
                <TextInput onChangeText={(text) => setEditedUser((current) => ({ ...current, name: text}))} textAlign={langContext.isRTL ? 'right' : 'left'} defaultValue={user?.user.name} editable={isEditing} style={[styles.input, {textAlign: langContext.isRTL ? 'right' : 'left'}]} />
                <TextInput onChangeText={(text) => setEditedUser((current) => ({ ...current, email: text}))} textAlign={langContext.isRTL ? 'right' : 'left'} defaultValue={user?.user.email} keyboardType="email-address" editable={isEditing} style={[styles.input, {textAlign: langContext.isRTL ? 'right' : 'left'}]} />
                <TextInput onChangeText={(text) => setEditedUser((current) => ({ ...current, phone: text}))} textAlign={langContext.isRTL ? 'right' : 'left'} defaultValue={user?.user.phone} keyboardType="phone-pad" textContentType="telephoneNumber" editable={isEditing} style={[styles.input, {textAlign: langContext.isRTL ? 'right' : 'left'}]} />
                <TouchableOpacity disabled={!isEditing} style={styles.saveBtn} onPress={() => updateUser()}>
                    <CustomText isRTL={langContext.isRTL} isGray={false} theme={themeContext}>{lang[langContext.lang].btnTitles.save}</CustomText>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'withe'
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