import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ErrorMessageSession({message}) {
    return (
        <View style={errorStyle.container}>
            <Text>{message}</Text>
        </View>
    );
}

const errorStyle = StyleSheet.create({
    container: {
        backgroundColor: "#E78F81",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        fontWeight: "700",
        marginHorizontal: 20,
        marginTop: 3,
        padding: 10,
        borderRadius: 10,

    },
});
