import React from "react";
import { View, Text } from "react-native";

export function LoadingComponent(){
    return(
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>Fetching Data..</Text>
        </View>
    )
}