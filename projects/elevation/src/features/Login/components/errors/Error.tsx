import React from "react";
import { Text, View } from "react-native";
import { stylesLogin } from "../../styles";
const Error = ({message}) => {
    return(
        <View>
            <Text style={stylesLogin.ErrorMessageText}>{message}</Text>
        </View>
    );
};
export default Error;
