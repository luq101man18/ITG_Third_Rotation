import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function Tasks({ taskCallback }) {
    const [task, setTask] = useState();
    const [tasks, addTask] = useState([]);

    const testSendTaskToParent = () => {
        taskCallback(task);
    };

    const onPress = () => {
        testSendTaskToParent(task);
    };

    return (
        <View>
            <View style={styles.taskStyle}>
                <Text>Create Task</Text>
            </View>
            <View style={styles.stopButton}>
                <TextInput
                    style={styles.taskStyle}
                    placeholder="ex: study math"
                    onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity onPress={onPress} style={styles.taskStyle}>
                    <Text>
                        Add Task
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    taskStyle: {
        // other source
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF885B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        color: 'black',
        //
    },
    currentTimeWidget: {
        backgroundColor: '#ff7527',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
});
