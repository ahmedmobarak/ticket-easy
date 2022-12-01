import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LangContext } from "../../context/langContext";
import { ThemeContext } from "../../context/themeContext";
import { Local } from "../../enviroment";
import { ApiRoutes } from "../../helpers/apiRoutes";
import { getUserInfo } from "../../helpers/getUserInfo";
import { themes } from "../../themes/themes";
import { CustomText } from "../custom/text";
import { TopbarComponent } from "../segments/topbar";
import { lang } from "../../i18n/lang";

export function WalletComponent(){

    const [balance, setBalance] = useState(null);
    const themeContext = useContext(ThemeContext).theme;
    const langContext = useContext(LangContext);

    useEffect(() => {
        getUserInfo().then(uesr => {

            axios.get(Local.baseUrl+ApiRoutes.wallet.getBalance+uesr.id).then(res => {
                console.log(res.data)
                setBalance(res.data)
            }).catch(error => console.log(error))
        })
    }, [])


    return(
        <>
        <TopbarComponent navigation={undefined} />
        <View style={[styles.container, {width: '100%', height: '100%', backgroundColor: themes[themeContext].primary}]}>
            <View style={{
                backgroundColor: themes.dark.mixed,
                borderRadius: 20,
                height: '30%',
                width: '95%',
                padding: 15
            }}>
                <CustomText isRTL={langContext.isRTL} isGray={false} theme={themeContext}>Your Current Balance: </CustomText>
                <Text style={{color: 'white', fontSize: 24}}>{balance?.wallet} {lang[langContext.lang].lables.sdg}</Text>
            </View>
        </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        // justifyContent: 'center', 
        alignItems: 'center',
        top: 5
    }
})