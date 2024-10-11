import React from "react";
import { View, Text } from "react-native";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";


export default function HomeView() {


    
    const accessTokenRedux = useAppSelector((state : RootState) => {return state.authentication.accessToken;});
    const refreshTokenRedux = useAppSelector((state: RootState) => {return state.authentication.refreshToken; });

    return(
        <View>
            <Text> Home View </Text>
            <Text>{accessTokenRedux}</Text>
            <Text>{refreshTokenRedux}</Text>
        </View>
    );
}
