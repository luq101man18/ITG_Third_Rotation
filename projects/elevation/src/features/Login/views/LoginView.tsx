import React from 'react';
import { View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { IconButton, Text, MD3Colors } from 'react-native-paper';
import { stylesLogin } from '../styles';
import { useState, useEffect  } from 'react';
import fetchUserCredentialData from '../server/api';
import { Dispatch } from '@reduxjs/toolkit';
import { fetchUser, setAccessToken, setRefreshToken, userAuth } from '../authentication/redux/authenticationSlice';
import { Selector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Credentials } from '../authentication/redux/authenticationSlice';
import { setUserCredentials } from '../authentication/redux/authenticationSlice';
import reactotron from 'reactotron-react-native';

export default function LoginView({ navigation } ) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [PasswordVisibility, setPasswordVisibility] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const dispatch = useAppDispatch();

    function goToHome() {
        navigation.navigate('Home');
    }

    function goToRegistrationScreen(){
        navigation.navigate('Registration');
    }

    function validateEmailAndPassword() {
        let flag = false;
        if(username === '') {
            setUsernameError(true);
            flag = true;
            return flag;
        } else if(password.length < 8) {
            setPasswordError(true);
            flag = true;
            return flag;
        } else {
            setUsernameError(false);
            setPasswordError(false);
            setUsernameValid(true);
            setPasswordValid(true);
            flag = false;
            return flag;
        }
    }

    function showPassword() {
        setPasswordVisibility(!PasswordVisibility);
    }


    // calling the fetch function
    let callFetchDataUserCredentials = async () => {
        if (username && password){
            const userAuthCredentials: userAuth =  {
                username: username,
                password: password,
            };
            // fetch user
            const retrievedUserCredentials = await dispatch(fetchUser(userAuthCredentials));
            if (retrievedUserCredentials) { return JSON.stringify(retrievedUserCredentials);}
        }
    };

    // helper function
    const checkCredentials = async () => {
        const credentials = await callFetchDataUserCredentials();
        if (credentials) {
            return credentials;
        }else{
            return null;
        }
    };

    async function processLogin() {
        if (validateEmailAndPassword()) {
            return;
        } else {
            const credentials =  await checkCredentials();
            if(credentials !== null){
                if (credentials === ''){
                    Alert.alert('Error has occurred! Please contact services or try again later');
                    return;
                } else {
                    const parsedUserCredentials = JSON.parse(credentials);
                    // save state
                    dispatch(setUserCredentials(parsedUserCredentials));
                    goToHome();
                }
            } else {
                Alert.alert('Error raised');
                return;
            }
        }
    }


    return(
        <View style={stylesLogin.container}>
            <View>
                <View style={stylesLogin.header}>
                    <Text style={stylesLogin.title}>Login to your account</Text>
                    <Text style={stylesLogin.welcomingHeader}>It's great to see you again.</Text>
                </View>
                <View>
                    <View style={stylesLogin.userInputs}>
                        <View style={stylesLogin.emailInput}>
                            <Text style={stylesLogin.textLabels} >Username</Text>
                            <TextInput
                                placeholder='Enter your email address'
                                style={ usernameError ? stylesLogin.errorEmail : usernameValid ? stylesLogin.validEmail : stylesLogin.textInput}
                                onChangeText={(text) => setUsername(text)}
                            />
                            <View style={{display: usernameError ? 'flex' : 'none'}}>
                                <Text style={stylesLogin.ErrorMessageText}>Please enter a valid username!</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={stylesLogin.textLabels} >Password</Text>

                            <View style={stylesLogin.passwordEye}>
                                <TextInput
                                    placeholder="Enter your password"
                                    style={passwordError ? stylesLogin.errorPasswordNoIcon : passwordValid ? stylesLogin.validPasswordNoIcon : stylesLogin.passwordTextInput}
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry = {!PasswordVisibility}
                                />
                                <View style={ passwordError ? stylesLogin.errorPasswordIcon : passwordValid ? stylesLogin.validPasswordIcon : stylesLogin.eyeIcon}>
                                    <IconButton
                                        icon={PasswordVisibility ? 'eye' : 'eye-off'}
                                        iconColor={MD3Colors.grey}
                                        size={20}
                                        onPress={() => showPassword()}
                                    />
                                </View>
                            </View>
                            <View style={{ display: passwordError ? 'flex' : 'none' }}>
                                <Text style={stylesLogin.ErrorMessageText}>Please enter a valid password!</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={stylesLogin.loginbutton} onPress={() => processLogin()}>
                            <Text style={stylesLogin.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={stylesLogin.bottom}>
                    <View style={stylesLogin.registerContainer}>
                        <Text style={stylesLogin.registerationText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => goToRegistrationScreen()}>
                            <Text style={{fontWeight:'bold', fontSize: 16}}>Join</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
