import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/HomeScreen';
import TaskAndTimer from "../screens/TaskAndTimer/TimerAndTask";
import ErrorScreen from "../screens/error/ErrorScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="TaskAndTimer" component={TaskAndTimer}  />
                <Stack.Screen name="ErrorScreen" component={ErrorScreen} />

            </Stack.Navigator>

        </NavigationContainer>
    );
}
