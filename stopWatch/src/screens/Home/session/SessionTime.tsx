import React from "react";

import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { stylesHome } from "../styles";
import { Alert } from "react-native";

export default function SessionTime({ sessionCallback }) {

    const [sessionTime, setSessionTime] = useState(0);

    const onPressStart = () => {
        validateSessionTime();
        sessionCallback(sessionTime);

    };
    const validateSessionTime = () => {
        if(!sessionTime || typeof sessionTime === 'number') {
            Alert.alert("Please enter a valid number");
            return;
        }
    };
    return (
        <View>
            <View style={stylesHome.viewSession}>
                <TextInput
                    style={stylesHome.sessionTimeInput}
                    placeholder="ex: 60"
                    onChangeText={(number) => setSessionTime(Number(number))}
                />
                <View style = {stylesHome.sessionTimeButton}>
                    <TouchableOpacity style={stylesHome.sessionTimeOpacity}  onPress={onPressStart}>
                        <Text>Set Session Time In Minutes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
