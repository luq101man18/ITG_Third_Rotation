import React from 'react';


import { Text, View } from 'react-native';
import { stylesAction } from '../styles';

import { StyleSheet } from 'react-native';

export default function Task( { taskRecieved }) {
    // the task and session time will be passed through a parameter when navigating to the TimerAndTask screen.
    // For now TaskName will be hard coded, then will be changed to tha passed parameter
    return (
        <View>
            <View style={stylesAction.taskName}>
                <Text style={stylesAction.taskText}>{ taskRecieved }</Text>
            </View>
        </View>
    );
}
