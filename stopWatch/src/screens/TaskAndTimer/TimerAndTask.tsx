import React from 'react';

import { View, Text } from 'react-native';
import Timer from './Timer/Timer';
import Task from './task/Task';
import { stylesAction } from './styles';



export default function TaskAndTimer({ route, navigation }) {
    const { sessionParam, taskParam } = route.params;
    return (
        <View>
            <View >
                <Text style={stylesAction.header}>Tackling Task</Text>
            </View>
            <View>
                <Task taskRecieved={taskParam} />
            </View>
            <View>
                <Timer session={sessionParam} taskName={taskParam} />
            </View>

        </View>
    );
}
