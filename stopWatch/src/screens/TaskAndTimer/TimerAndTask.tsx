import React from 'react';

import { View, Text } from 'react-native';
import Timer from './Timer/Timer';
import Task from './task/Task';
import { StyleSheet } from 'react-native';
import HomeScreen from '../Home/HomeScreen';
import { stylesAction } from './styles';



export default function TaskAndTimer({ route, navigation }) {
    const { sessionParam, taskParam } = route.params;
    return (
        <View>
            <View >
                <Text style={stylesAction.header}>Tackling Task</Text>
            </View>
            <View>
                {/* pass the task name parameter here */}
                <Task taskRecieved={taskParam} />
            </View>
            <View>
                {/* pass the session time parameter here */}
                <Timer session={sessionParam} taskName={taskParam} />
            </View>

        </View>
    );
}
