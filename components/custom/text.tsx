import { Text } from "react-native";
import { themes } from "../../themes/themes";

interface TextProps{
    theme: 'light' | 'dark',
    size?: number,
    isGray: boolean,
    isRTL: boolean,
    children: any
}

export function CustomText({theme, size, isGray, isRTL, children}: TextProps){
    return(
        <Text style={{
            fontFamily: 'Roboto',
            color: isGray ? themes[theme].textColorGray : themes[theme].primary,
            fontSize: size,
            textAlign: 'left',
            alignSelf: 'flex-start'
        }}>
            {children}
        </Text>
    )
}