import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Tasks from './tasks/Tasks';
import SessionTime from './session/SessionTime';
import { useState } from 'react';
import { stylesHome } from './styles';


export default function HomeScreen({ navigation }) {
    const [timeSession, setTimeSesion] = useState(0);
    const [nameTask, setTaskName] = useState('');
    const onPress = () => {
        navigation.navigate('TaskAndTimer', { sessionParam: timeSession, taskParam: nameTask });
    };

    const onPressHistory = () => {
        navigation.navigate('HistoryTasks', { completedTask: nameTask });
    };

    return (
        <View>
            <View>
                <Text style={stylesHome.header}>SessionTime</Text>
            </View>
            <View>
                <SessionTime sessionCallback={setTimeSesion} />
            </View>
            <View>
                <Tasks taskCallback = {setTaskName} />
            </View>
            <View>
                <View style={stylesHome.inputs}>
                    <Text style={stylesHome.inputsText}>Task Name: {nameTask}</Text>
                    <Text style={stylesHome.inputsText}>Session Time: {timeSession}</Text>
                </View>
                <View>
                    <TouchableOpacity style={stylesHome.startSession} onPress={onPress}>
                        <Text style={stylesHome.startText}>Start Session</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={stylesHome.showHisotry} onPress={onPressHistory}>
                        <Text style={stylesHome.historyText}>See All Completed Tasks</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
