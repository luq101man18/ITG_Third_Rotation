import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskList } from '../screens/historyTasks/HistoryTasks';
import Reactotron, { asyncStorage } from "reactotron-react-native"



export const storeTasksToStorage = async (value: any) => {
    try {

        let tempTaskList = taskList;
        tempTaskList = [...taskList, value];


        // debugger
        //Reactotron.logImportant('Checking the value of myVariable');
        //Reactotron.log(tempTaskList);
        //

        const jsonValue = JSON.stringify(tempTaskList);
        await AsyncStorage.setItem('completed-task-list', jsonValue);
    } catch (e) {
        console.log(e);
    }
};


export const clearAsyncStorage =  async () => {
    try {
        await AsyncStorage.setItem('completed-task-list', "");
    } catch (error) {
        console.log(error);

    }
};


