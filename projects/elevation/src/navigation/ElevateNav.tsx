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
import CartView from '../features/Cart/views/CartView';
import AddressView from '../features/Address/views/AddressView';
import CheckoutView from '../features/Checkout/views/CheckoutView';
import PaymentView from '../features/Payment/views/PaymentView';
import NewPaymentMethodView from '../features/Payment/views/NewPaymentMethodView';
import OrderView from '../features/Order/views/OrderView';
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
                    <Stack.Screen name="Cart" component={CartView} />
                    <Stack.Screen name="Address" component={AddressView} />
                    <Stack.Screen name="Checkout" component={CheckoutView} />
                    <Stack.Screen name="Payment" component={PaymentView} />
                    <Stack.Screen name="NewPaymentMethod" component={NewPaymentMethodView} />
                    <Stack.Screen name="Order" component={OrderView} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}


