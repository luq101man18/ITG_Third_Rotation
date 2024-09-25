import React, { useContext } from 'react';

import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import { MyContext } from '../../../components/Historycontext/HistoryContext';
import { storeTasksToStorage, clearAsyncStorage } from '../../../utils/storageStore';
import { stylesAction } from '../styles';

let currentIntevral = setInterval(() => { }, 0);

export default function Timer({ session, taskName }) {

    const [time, setTime] = useState(0);
    // to handle double clicking
    useEffect(() => {
        let currentTime = 0;
        currentIntevral = setInterval(() => {
            currentTime += 1;
            setTime(currentTime);
            if (currentTime === session) {  // currentTime should be compared to sessionTime but for now sessionsTime will be hard coded
                Alert.alert("Time's up!");
                clearInterval(currentIntevral);
                setTime(0);
                //clearAsyncStorage();
                storeTasksToStorage(taskName);
            }
        }, 1000);
        return () => {
            clearInterval(currentIntevral);
        };
    }
    , []); // empty dependencies means only works on mount


    const onPressStop = () => {
        clearInterval(currentIntevral);
        setTime(0);
        // navigate to other screen and delete the highlighted task
    };


    return (
        <View>
            <View>

                <View style={stylesAction.currentTime}>
                    <Text style={stylesAction.curretnTimeText}>Current Time: {time}</Text>
                </View>
                <TouchableOpacity style={stylesAction.stopButton} onPress={onPressStop}>
                    <Text style={stylesAction.actionText}>Stop</Text>
                </TouchableOpacity> 
            </View>
        </View>
    );
}
