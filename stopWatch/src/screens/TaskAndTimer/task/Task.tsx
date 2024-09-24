import React from 'react';


import { Text, View } from 'react-native';


import { StyleSheet } from 'react-native';

export default function Task( { taskRecieved }) {
    // the task and session time will be passed through a parameter when navigating to the TimerAndTask screen.
    // For now TaskName will be hard coded, then will be changed to tha passed parameter
    return (
        <View>
            <View style={styles.stopButton}>
                <Text>{ taskRecieved }</Text>
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
