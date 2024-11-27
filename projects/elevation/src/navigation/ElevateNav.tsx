import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import LoginView from '../features/Login/views/LoginView';
import RegistrationView from '../features/Registration/views/RegistrationView';
import HomeView from '../features/Home/views/HomeView';
import ProductDetailsView from '../features/ProductDetialsPage/views/ProductDetailsView';
import CartView from '../features/Cart/views/CartView';
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
                    <Stack.Screen name="Home" component={HomeView} />
                    <Stack.Screen name="ProductDetails" component={ProductDetailsView} />

                    <Stack.Screen name="Cart" component={CartView} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}


