import React from "react";

import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';



export default function SessionTime({ sessionCallback }) {

    const [sessionTime, setSessionTime] = useState(0);

    const onPressStart = () => {
       // navigation.navigate('TaskAndTimer', { sessionParam: sessionTime, taskParam: taskName  });
        sessionCallback(sessionTime);
    };

    return (
        <View>
            <View>
                <TextInput
                    style={styles.stopButton}
                    placeholder="set session time"
                    onChangeText={(number) => setSessionTime(Number(number))}
                />
                <TouchableOpacity style={styles.stopButton} onPress={onPressStart}>
                    <Text>Set Session Time</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    stopButton: {
        // other source
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        //
    },
    currentTimeWidget: {
        backgroundColor: '#ff7527',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
});
