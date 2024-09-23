import React from 'react';


import { Text, View, TextInput, TouchableOpacity } from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';

import { Checkbox } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function Tasks({ taskCallback }) {
    const [task, setTask] = useState();
    const [tasks, addTask] = useState([]);

    // for multip. tasks checkbox
    // const [checked, setChecked] = React.useState(false);

    let targetedTask = "";
    const testSendTaskToParent = () => {
        taskCallback(task);
    };

    const onPress = () => {
        // to add task to a task list
        //addTask([...tasks,task]);

        // only add one task then take it to the other screen
        //targetedTask = task.toString();
        
        testSendTaskToParent(task);
    };


    return (
        <View>
            <View style={styles.stopButton}>
                <Text>Create Task</Text>
            </View>
            <View style={styles.stopButton}>
                <TextInput
                    placeholder="ex: study math"
                    onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity onPress={onPress}>
                    <Text>
                        Add Task
                    </Text>
                </TouchableOpacity>
                {/* <View>
                    <Text>{targetedTask}</Text>
                </View> */}
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    stopButton: {
        // other source
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff32523',
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
