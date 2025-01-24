import { Text } from "react-native";
import { themes } from "../../themes/themes";

interface TextProps{
    theme?: 'light' | 'dark',
    size?: number,
    isGray?: boolean,
    textAlign?: 'auto' | 'center' | 'left' | 'right',
    children: any
}

export function CustomText({theme, size, isGray, textAlign, children}: TextProps){
    return(
        <Text style={{
            fontFamily: 'Roboto',
            color: isGray ? themes[theme].textColorGray : themes[theme].primary,
            fontSize: size,
            textAlign: textAlign,
            alignSelf: 'flex-start'
        }}>
            {children}
        </Text>
    )
}