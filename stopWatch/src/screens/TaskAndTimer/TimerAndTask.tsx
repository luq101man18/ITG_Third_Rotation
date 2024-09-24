import React from 'react';

import { View, Text } from 'react-native';
import Timer from './Timer/Timer';
import Task from './task/Task';
import { StyleSheet } from 'react-native';
import HomeScreen from '../Home/HomeScreen';




export default function TaskAndTimer({ route, navigation }) {
    const { sessionParam, taskParam } = route.params;
    return (
        <View>
            <View>
                <Text>Tackling Task</Text>
            </View>
            <View>
                {/* pass the session time parameter here */}
                <Timer session={sessionParam} taskName={taskParam} />
            </View>
            <View>
                {/* pass the task name parameter here */}
                <Task taskRecieved={taskParam}/>
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
