import React from "react";

import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

let taskList = [];

const storeTasksToStorage = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('completed-task-list', jsonValue);
    } catch (e) {
        console.log(e);
    }
};


const getTasksFromStorage = async () => {
    try {
        const value = await AsyncStorage.getItem('completed-task-list');
        if (value !== null) {
            return true;
        }
    } catch (e) {
        return false;
    }
};

if(getTasksFromStorage) {
    taskList = JSON.parse(await AsyncStorage.getItem('completed-task-list'));
    navigation.navigate('ErrorScreen');
}

export default function History({ completedTask, navigation }) {


    taskList.push(completedTask);

    storeTasksToStorage(taskList);

    return (
        <View>
            <View>
                <Text style={styles.stopButton}>Completed Task list</Text>
                <View>
                    <Text>{taskList.map((task) => task)}</Text>
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
