import React from 'react';


import { Text, View } from 'react-native';
import { stylesAction } from '../styles';

import { StyleSheet } from 'react-native';

export default function Task( { taskRecieved }) {
    return (
        <View>
            <View style={stylesAction.taskName}>
                <Text style={stylesAction.taskText}>{ taskRecieved }</Text>
            </View>
        </View>
    );
}
