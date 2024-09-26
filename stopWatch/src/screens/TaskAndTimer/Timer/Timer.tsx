import React from 'react';

import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import { storeTasksToStorage } from '../../../utils/storageStore';
import { stylesAction } from '../styles';

let currentIntevral = setInterval(() => { }, 0);

export default function Timer({ session, taskName }) {

    const [time, setTime] = useState(0);
    useEffect(() => {
        let currentTime = 0;
        currentIntevral = setInterval(() => {
            currentTime += 1;
            setTime(currentTime);
            if (currentTime === (session * 60)) {
                Alert.alert("Time's up!");
                clearInterval(currentIntevral);
                setTime(0);
                storeTasksToStorage(taskName);
            }
        }, 1000);
        return () => {
            clearInterval(currentIntevral);
        };
    }
    , []);


    const onPressStop = () => {
        clearInterval(currentIntevral);
        setTime(0);
    };


    return (
        <View>
            <View>

                <View style={stylesAction.currentTime}>
                    <Text style={stylesAction.curretnTimeText}>Current Time In Minutes: {Math.round((time / 60) * 100) / 100}</Text>
                </View>
                <TouchableOpacity style={stylesAction.stopButton} onPress={onPressStop}>
                    <Text style={stylesAction.actionText}>Stop</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
