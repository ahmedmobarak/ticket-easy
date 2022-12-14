import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";

export function GradBackground({ content, color1, color2 }) {
    return (
        <View style={{ flex: 1 }}>
            <Svg height='100%' width='100%' style={StyleSheet.absoluteFillObject}>
                <Defs>
                    <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0" stopColor={color1} />
                        <Stop offset="1" stopColor={color2} />
                    </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grad)" />
            </Svg>
            {content}
        </View>
    )
}