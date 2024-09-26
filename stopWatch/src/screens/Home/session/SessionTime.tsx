import React from "react";

import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { stylesHome } from "../styles";
import ErrorMessageSession from "@/src/components/error/ErrorMessageSession";
import { sessionTimeError } from "@/src/utils/errormessages";
export default function SessionTime({ sessionCallback, invalidInputCallback }) {

    const [sessionTime, setSessionTime] = useState(0);
    const [error, showError] = useState(false);

    const onPressStart = () => {
        if (validateSessionTime()) {
            sessionCallback(sessionTime);
        } else {
            return;
        }
    };
    function validateSessionTime() {
        if(!sessionTime || isNaN(sessionTime)) {
            showError(true);
            invalidInputCallback(true);
            return false;
        }
        showError(false);
        invalidInputCallback(false);
        return true;
    }


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
            <View style={StyleSheet.create({display: error ? 'flex' : 'none'})}>
                <ErrorMessageSession message={sessionTimeError}/>
            </View>
        </View>
    );
}
