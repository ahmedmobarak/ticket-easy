import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, StatusBar, SafeAreaView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { IUser } from "../../models/user";
import { TopbarComponent } from "../segments/topbar";
import { UserContext } from "../../context/userContext";
import { ThemeContext } from "../../context/themeContext";
import { themes } from "../../themes/themes";
import { LangContext } from "../../context/langContext";
import { CustomText } from "../custom/text";
import { lang } from "../../i18n/lang";
import { AuthApi } from "../../fetch/auth";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function ProfileComponent({ navigation }) {
    const user = useContext(UserContext);

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user.user as IUser);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [currentTab, setCurrentTab] = useState('profile' as 'profile' | 'privacy' | 'about' | 'personalize');
    const [checked, setChecked] = useState('');

    const themeContext: 'light' | 'dark' = useContext(ThemeContext).theme;
    const theme = useContext(ThemeContext);
    const langContext = useContext(LangContext);

    useEffect(() => {
        if (themeContext == 'dark') {
            setIsDarkTheme(true);
        }
        setChecked(langContext.lang);
    }, [currentTab, checked]);
    function updateUser() {
        console.log(editedUser);
        AuthApi.updateUserInfo(editedUser).then(res => user.setUser(res.data)).catch(error => console.log(error))
    }
    function toggleThemeSwitch(value: boolean): void | Promise<void> {
        setIsDarkTheme(value);
        theme.toggleTheme();
    }

    function onCurrenTabChange(tab: 'profile' | 'privacy' | 'about' | 'personalize')
    {
        console.log(tab)
        setCurrentTab(tab);
    }

    function onCheck(value: 'ar' | 'en'){
        setChecked(value);
        langContext.setLanguage(value);
    }

    const rows = [
        { color: '#B3B33AFF', icon: 'person-circle', title: 'Profile', subtitle: 'Account details, apps and features' },
        { color: '#103BCAFF', icon: 'color-palette', title: 'Personalize', subtitle: 'Themes, wallpapers, and icons' },
        { color: '#21A54DFF', icon: 'lock-closed', title: 'Privacy', subtitle: 'Permissions and privacy options' },
        { color: '#A5169EFF', icon: 'information-circle', title: 'About', subtitle: 'Software info and updates' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <ExpoStatusBar translucent={true} backgroundColor={themes[themeContext].primary} style='auto' />
            <ScrollView contentContainerStyle={{ height: '100%' }} style={{ minHeight: '100%', direction: langContext.isRTL ? 'rtl' : 'ltr', width: '100%', height: '100%', backgroundColor: themes[themeContext].primary }}>
                <ScrollView style={[styles.container, { direction: langContext.isRTL ? 'rtl' : 'ltr' }]}>
                <Text style={styles.title}>{lang[langContext.lang].lables.settings}</Text>
                    <TouchableOpacity onPress={() => onCurrenTabChange('profile')} style={styles.row}>
                        <Icon name="person-circle" size={24} color="#874588" style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{lang[langContext.lang].lables.profile}</Text>
                            <Text style={styles.subtitle}>{lang[langContext.lang].subtitles.profile}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.container, {display: currentTab == 'profile' ? 'flex' : 'none'}]}>
                        <CustomText theme={themeContext} isGray={false} textAlign={"auto"}>{lang[langContext.lang].lables.name}</CustomText>
                        <View style={[styles.info]}>
                            <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', padding: 10, borderRadius: 40 }}>
                                <TouchableOpacity onPress={() => setIsEditing(true)} style={[styles.btnGroup, { backgroundColor: isEditing ? '#9EC0FF' : '#96969696' }]}><Text>{lang[langContext.lang].btnTitles.edit}</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => setIsEditing(false)} style={[styles.btnGroup, { backgroundColor: !isEditing ? '#9EC0FF' : '#96969696' }]}><Text>{lang[langContext.lang].btnTitles.cancel}</Text></TouchableOpacity>
                                <TouchableOpacity disabled={!isEditing} style={[styles.btnGroup, { backgroundColor: isEditing ? '#9EC0FF' : '#96969696' }]} onPress={() => updateUser()}>
                                    <CustomText textAlign={'center'} isGray={false} theme={themeContext}>{lang[langContext.lang].btnTitles.save}</CustomText>
                                </TouchableOpacity>
                            </View>
                            <TextInput onChangeText={(text) => setEditedUser((current) => ({ ...current, name: text }))} textAlign={langContext.isRTL ? 'right' : 'left'} defaultValue={user?.user.name} editable={isEditing} style={[styles.input, { textAlign: langContext.isRTL ? 'right' : 'left' }]} />
                            <TextInput onChangeText={(text) => setEditedUser((current) => ({ ...current, email: text }))} textAlign={langContext.isRTL ? 'right' : 'left'} defaultValue={user?.user.email} keyboardType="email-address" editable={isEditing} style={[styles.input, { textAlign: langContext.isRTL ? 'right' : 'left' }]} />
                            <TextInput onChangeText={(text) => setEditedUser((current) => ({ ...current, phone: text }))} textAlign={langContext.isRTL ? 'right' : 'left'} defaultValue={user?.user.phone} keyboardType="phone-pad" textContentType="telephoneNumber" editable={isEditing} style={[styles.input, { textAlign: langContext.isRTL ? 'right' : 'left' }]} />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => onCurrenTabChange('personalize')} style={styles.row}>
                        <Icon name="color-palette" size={24} color="#B64E4EFF" style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{lang[langContext.lang].lables.personlize}</Text>
                            <Text style={styles.subtitle}>{lang[langContext.lang].subtitles.personlize}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: 40 ,display: currentTab == 'personalize' ? 'flex' : 'none'}}>
                        <Text>Dark mode</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={themeContext == 'dark' ? '#F5734BFF' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleThemeSwitch}
                            value={isDarkTheme}
                        />
                    <Text>Language</Text>
                    <RadioButton status={ checked === 'ar' ? 'checked' : 'unchecked' } onPress={(v) => onCheck('ar')} value="ar"/><Text>Ar</Text>
                    <RadioButton status={ checked === 'en' ? 'checked' : 'unchecked' } onPress={(v) => onCheck('en')} value="en"/><Text>En</Text>
                    </View>
                    <TouchableOpacity onPress={() => onCurrenTabChange('privacy')} style={styles.row}>
                        <Icon name="lock-closed" size={24} color="#33A358FF" style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{lang[langContext.lang].lables.privacy}</Text>
                            <Text style={styles.subtitle}>{lang[langContext.lang].subtitles.privacy}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onCurrenTabChange('about')} style={styles.row}>
                        <Icon name="information-circle" size={24} color="#49BCDFFF" style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{lang[langContext.lang].lables.about}</Text>
                            <Text style={styles.subtitle}>{lang[langContext.lang].subtitles.about}</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>   
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    icon: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        marginTop: 3,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 10,
    },
    info: {
        display: 'flex',
        // backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 20,
        borderWidth: 0.1,
        borderColor: '#B6B6B6B4',
        // elevation: 5,
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
        textAlign: 'center',
        width: '31%',
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
        width: '31%',
        borderRadius: 20
    }
})

import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from "react-native-paper";

