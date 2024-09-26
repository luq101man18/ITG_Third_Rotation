import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reactotron, { asyncStorage } from "reactotron-react-native"
import { stylesHisotry } from './styles';
import { removeItemFromAsyncStorage } from '@/src/utils/storageStore';
export let taskList : any = [];

export default function HistoryTasks({ route, navigation }) {
    const { completedTask } = route.params;
    const [completedTaskChecker, checkCompletedTask] = useState(false);
    const [taskListState, setTaskList] = useState([]);

    const clearHistory = () => {
            taskList = [];
            setTaskList([]);
            removeItemFromAsyncStorage();
        };

    const getTasksFromStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('completed-task-list');

            if (jsonValue != null) {
                taskList = JSON.parse(jsonValue);
                setTaskList(taskList);
                checkCompletedTask(true);
            } else {
                return;
            }
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
                <Text style={stylesHisotry.header}>Completed Task list</Text>
                <View style={StyleSheet.create({display: completedTaskChecker ? 'flex' : 'none'})}>
                    <View style={stylesHisotry.tasks}>
                        {taskListState.map((item, index) => {
                            return (
                                <View key={index} style={stylesHisotry.tasksView}>
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
        </View>
    );
}


