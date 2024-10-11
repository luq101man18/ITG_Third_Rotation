import React from 'react';
import { View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { IconButton, Text, MD3Colors } from 'react-native-paper';
import { stylesLogin } from '../styles';
import { useState, useEffect  } from 'react';
import fetchUserCredentialData from '../server/api';
import { Dispatch } from '@reduxjs/toolkit';
import { setAccessToken, setRefreshToken } from '../authentication/redux/authenticationSlice';
import { Selector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';


export default function LoginView({ navigation } ) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [PasswordVisibility, setPasswordVisibility] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [userCredentials, setUserCredentials] = useState('');
    // try using object state rather targeting each with a different state. even though rendering wise it mithgt not be the best
        // since it doesn't decrease the number of renders and might rebuild unnecessary parts that didn't change in the object.


    // move the below to global state, aka, useContext
    // const [accessToken, setAccessToken] = useState();
    // const [refreshToken, setRefreshToken] = useState('');

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

    useEffect(() => {
        // calling the fetch function
        let callFetchDataUserCredentials = async () => {
            if (username && password){
                const retrievedUserCredentials = await fetchUserCredentialData(username, password);
                if (retrievedUserCredentials) { setUserCredentials(JSON.stringify(retrievedUserCredentials));}
            }
        };
        callFetchDataUserCredentials();
    }, [username, password]);

    function processLogin() {
        if (validateEmailAndPassword()) {
            return;
        } else {
            if (userCredentials === ''){
                return Alert.alert('Error has occurred! Please contact services or try again later');
            } else {
                const parsedUserCredentials = JSON.parse(userCredentials);
                dispatch(setAccessToken(parsedUserCredentials.accessToken));
                dispatch(setRefreshToken(parsedUserCredentials.refreshToken));
                goToHome();
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
