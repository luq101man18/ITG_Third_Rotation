import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MyContext } from '../../components/Historycontext/HistoryContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reactotron, { asyncStorage } from "reactotron-react-native"


//const [taskListToString, setList] = useState('');
export let taskList : any = [];

export default function HistoryTasks({ route, navigation }) {

    const { flag, setFlag } = useContext(MyContext);
    const { completedTask } = route.params;

    const [taskListState, setTaskList] = useState();

    const getTasksFromStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('completed-task-list');

            if (jsonValue != null) {
                // Reactotron.logImportant('Checking the value of jsonValue in getTasks');
                // Reactotron.log(JSON.parse(jsonValue));
                taskList = JSON.parse(jsonValue);
                setTaskList(taskList);
            } else {
                return taskListState;
            }
            // return jsonValue != null ? JSON.parse(jsonValue) : test;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getTasksFromStorage();
    }, []);
    return (
        <View>
            <View>
                <Text style={styles.stopButton}>Completed Task list</Text>
                <View style={styles.stopButton}>
                        {/* <Text>{taskList.join(", ")}</Text> */}
                    <Text>{taskList.join(', ')}</Text>
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
