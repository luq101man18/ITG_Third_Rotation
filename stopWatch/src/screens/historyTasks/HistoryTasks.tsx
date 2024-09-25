import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MyContext } from '../../components/Historycontext/HistoryContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reactotron, { asyncStorage } from "reactotron-react-native"


// styles
import { stylesHisotry } from './styles';
import { clearAsyncStorage } from '@/src/utils/storageStore';
//const [taskListToString, setList] = useState('');
export let taskList : any = [];

export default function HistoryTasks({ route, navigation }) {
    const { completedTask } = route.params;

    const [taskListState, setTaskList] = useState();


    const clearHistory = () => {
            clearAsyncStorage();
        };

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
        const clearHistory = () => {
            clearAsyncStorage();
        };
    }, []);

    useEffect(() => {
        getTasksFromStorage();
    }, []);
    return (
        <View>
            <View>
                <Text style={stylesHisotry.header}>Completed Task list</Text>
                <View style={stylesHisotry.tasks}>
                    {taskList.map((item, index) => {
                            return (
                                <View key={index} style = {stylesHisotry.tasksView}>
                                    <Text style={stylesHisotry.tasks}>{item}</Text>
                                </View>
                            );
                        })}

                </View>
                <View>
                    <TouchableOpacity style={stylesHisotry.clearHistory} onPress={clearHistory}>
                        <Text style={stylesHisotry.clearHistoryText}>Clear History</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


