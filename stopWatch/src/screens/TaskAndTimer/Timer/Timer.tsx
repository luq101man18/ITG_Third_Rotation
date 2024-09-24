import React, { useContext } from 'react';

import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import { MyContext } from '../../../components/Historycontext/HistoryContext';
import { storeTasksToStorage, clearAsyncStorage } from '../../../utils/storageStore';


let currentIntevral = setInterval(() => { }, 0);

export default function Timer({ session, taskName }) {

    const [time, setTime] = useState(0);
    const { setFlag } = useContext(MyContext);
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
                <TouchableOpacity style={styles.stopButton} onPress={onPressStop}>
                    <Text>Stop</Text>
                </TouchableOpacity>
                <View style={styles.currentTimeWidget}>
                    <Text>Current Time: {time}</Text>
                </View>
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
