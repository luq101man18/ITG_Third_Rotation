import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import Tasks from './tasks/Tasks';
import History from './history/History';
import SessionTime from './session/SessionTime';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
export default function HomeScreen({ navigation }) {
    const [timeSession, setTimeSesion] = useState(0);
    const [nameTask, setTaskName] = useState("");

    const onPress = () => {
        navigation.navigate('TaskAndTimer', { sessionParam: timeSession, taskParam: nameTask  });
    };

    return (
        <View>
            <View>
                <Text>Stop Watch</Text>
            </View>
            <View>
                <SessionTime sessionCallback={setTimeSesion} />
            </View>
            <View>
                <Tasks taskCallback = {setTaskName} />
            </View>
            <View>
                <View>
                    <Text>Task Name: {nameTask}</Text>
                    <Text>Session Time: {timeSession}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.stopButton} onPress={onPress}>
                        <Text>Start Session</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <View style={styles.stopButton}>
                    <History />
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
