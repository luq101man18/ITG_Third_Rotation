import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import LoginView from '../features/Login/views/LoginView';
import RegistrationView from '../features/Registration/views/RegistrationView';
import SearchView from '../features/Search/views/SearchView';
import SearchProductView from '../features/SearchProduct/views/SearchProductView';
import HomeView from '../features/Home/views/HomeView';
import ProductDetailsView from '../features/ProductDetialsPage/views/ProductDetailsView';
import AddressView from '../features/Address/views/AddressView';
const Stack = createNativeStackNavigator();

export default function ElevateNav() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{
                    contentStyle: { backgroundColor: '#fff' },
                    headerShown: false,
                }}>
                    <Stack.Screen name="Login" component={LoginView} />
                    <Stack.Screen name="Registration" component={RegistrationView} />
                    <Stack.Screen name="Search" component={SearchView} />
                    <Stack.Screen name="SearchProduct" component={SearchProductView} />
                    <Stack.Screen name="Home" component={HomeView} />
                    <Stack.Screen name="ProductDetails" component={ProductDetailsView} />


                    <Stack.Screen name="Address" component={AddressView} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}


