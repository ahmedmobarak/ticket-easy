import { DarkTheme } from "./dark";
import { LightTheme } from "./light";
import { StyleSheet } from "react-native"

export const themes = {
    dark: DarkTheme,
    light: LightTheme
}

export const globalStyles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        borderRadius: 40
    },
    input: {
        borderRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderColor: '#CACACA'
    }
})