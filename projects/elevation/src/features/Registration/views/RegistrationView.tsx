import React, { useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { IconButton, Text, MD3Colors } from 'react-native-paper';
import { stylesLogin } from '../styles';
import { useState } from 'react';
import addUserCredentialData from '../server/api';

export default function RegistrationView({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [PasswordVisibility, setPasswordVisibility] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [firstNameValid, setFirstNameValid] = useState(false);
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [lastNameValid, setLastNameValid] = useState(false);
    const [userCredentials, setUserCredentials] = useState('');


    function validateCredentials() {
        let flag = false;
        if(firstName === "") {
            setFirstNameError(true);
            flag = true;
            return flag;
        }
        else if(lastName === "") {
            setFirstNameError(false);
            setLastNameError(true);
            flag = true;
            return flag;
        }
        else if(username === "") {
            setLastNameError(false);
            setUsernameError(true);
            flag = true;
            return flag;
        } else if (password.length < 8 || password === "") {
            setUsernameError(false);
            setPasswordError(true);
            flag = true;
            return flag;
        } else {
            setPasswordError(false);
            setUsernameValid(true);
            setPasswordValid(true);
            setFirstNameValid(true);
            setLastNameValid(true);
            flag = false;
            return flag;
        }
    }
    function processRegistration(){
        if (validateCredentials()){
            return;
        } else {
            if (userCredentials === '') {
                return Alert.alert('Error has occurred! Please contact services or try again later');
            } else {
                goToLogin();
            }
        }
    }

    function goToLogin(){
        navigation.navigate('Login');
    }

    function showPassword() {
        setPasswordVisibility(!PasswordVisibility);
    }


    useEffect(() => {
        // calling the fetch function
        let callAddUserCredentialsData = async () => {
            if (firstName && lastName && username && password) {
                const retrievedUserCredentials = await addUserCredentialData(firstName, lastName, username, password);

                if (retrievedUserCredentials) { setUserCredentials(JSON.stringify(retrievedUserCredentials)); }
            }
        };
        callAddUserCredentialsData();
    }, [firstName, lastName, username, password]);

    return(
        <View style={stylesLogin.container}>
            <View>
                <View style={stylesLogin.header}>
                    <Text style={stylesLogin.title}>Create an account</Text>
                    <Text style={stylesLogin.welcomingHeader}>Let's create your account.</Text>
                </View>
                <View>
                    <View style={stylesLogin.userInputs}>
                        <View style={stylesLogin.emailInput}>
                            <Text style={stylesLogin.textLabels} >First Name</Text>
                            <TextInput
                                placeholder="Enter your first name"
                                style={firstNameError ? stylesLogin.errorEmail : firstNameValid ? stylesLogin.validEmail : stylesLogin.textInput}
                                onChangeText={(text) => setFirstName(text)}
                            />
                        </View>
                        <View style={{ display: firstNameError ? 'flex' : 'none' }}>
                            <Text style={stylesLogin.ErrorMessageText}>Please enter your first name!</Text>
                        </View>
                        <View style={stylesLogin.emailInput}>
                            <Text style={stylesLogin.textLabels} >Last Name</Text>
                            <TextInput
                                placeholder="Enter your last name"
                                style={lastNameError ? stylesLogin.errorEmail : lastNameValid ? stylesLogin.validEmail : stylesLogin.textInput}
                                onChangeText={(text) => setLastName(text)}
                            />
                        </View>
                        <View style={{ display: lastNameError ? 'flex' : 'none' }}>
                            <Text style={stylesLogin.ErrorMessageText}>Please enter your last name!</Text>
                        </View>
                        <View style={stylesLogin.emailInput}>
                            <Text style={stylesLogin.textLabels} >Username</Text>
                            <TextInput
                                placeholder="Enter your username"
                                style={ usernameError ? stylesLogin.errorEmail : usernameValid ? stylesLogin.validEmail : stylesLogin.textInput}
                                onChangeText={(text) => setUsername(text)}
                            />
                            <View style={{display: usernameError ? 'flex' : 'none'}}>
                                <Text style={stylesLogin.ErrorMessageText}>Please enter a valid email!</Text>
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
                                        icon={PasswordVisibility ? "eye" : "eye-off"} 
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
                        <Text>By signing up you agree to our Terms, Privacy Policy and Cookie Use</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={stylesLogin.registrationbutton} onPress={() => processRegistration()}>
                            <Text style={stylesLogin.loginText}>Create an Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={stylesLogin.bottom}>
                    <View style={stylesLogin.registerContainer}>
                        <Text style={stylesLogin.registerationText}>Do you have an account? </Text>
                        <TouchableOpacity onPress={() => goToLogin()}>
                            <Text style={{fontWeight:"bold", fontSize: 16}}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
