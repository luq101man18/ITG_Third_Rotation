import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import Home from '../features/Home/Home';
import LoginView from '../features/Login/views/LoginView';
import RegistrationView from '../features/Registration/views/RegistrationView';
import Search from '../features/Home/components/search/Search';
import SearchView from '../features/Search/views/SearchView';
const Stack = createNativeStackNavigator();

export default function ElevateNav() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{
                    contentStyle: { backgroundColor: '#fff' },
                    headerShown: false,
                }}>
                    <Stack.Screen name="Login" component={LoginView} />
                    <Stack.Screen name="Registration" component={RegistrationView} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Search" component={SearchView} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}


