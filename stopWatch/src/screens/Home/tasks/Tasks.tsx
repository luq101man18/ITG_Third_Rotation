import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { stylesHome } from '../styles';

export default function Tasks({ taskCallback }) {
    const [task, setTask] = useState();

    const testSendTaskToParent = () => {
        taskCallback(task);
    };

    const onPress = () => {
        testSendTaskToParent(task);
    };

    return (
        <View>
            <View style={stylesHome.createTaskHeader}>
                <Text style={stylesHome.taskHeaderText}>Create Task</Text>
            </View>
            <View>
                <TextInput
                    style={stylesHome.taskInput}
                    placeholder="ex: study math"
                    onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity onPress={onPress} style={stylesHome.taskButton}>
                    <Text style={stylesHome.textButton}>
                        Add Task
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

