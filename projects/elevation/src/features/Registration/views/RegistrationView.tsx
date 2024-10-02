import React from "react";
import { View, TouchableOpacity, TextInput, Alert } from "react-native";
import { IconButton, Text, MD3Colors } from "react-native-paper";
import { stylesLogin } from "../styles";
import { useState } from "react";

export default function RegistrationView({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [PasswordVisibility, setPasswordVisibility] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState(false);
    const [fullNameValid, setFullNameValid] = useState(false);


    function validateCredentials() {
        const emailExpression = /\S+@\S+\.\S+/;
        let flag = false;
        if(fullName === "") {
            setFullNameError(true);
            flag = true;
            return flag;
        }
        if(!email.match(emailExpression) || email === "") {
            setEmailError(true);
            flag = true;
            return flag;
        } else if (password.length < 8 || password === "") {
            setPasswordError(true);
            flag = true;
            return flag;
        } else {
            setEmailError(false);
            setPasswordError(false);
            setFullNameError(false);
            setEmailValid(true);
            setPasswordValid(true);
            setFullNameValid(true);
            flag = false;
            return flag;
        }
    }
    function processRegistration(){
        if (validateCredentials()){
            return;
        } else {
            navigation.navigate('Login');
        }
    }

    function goToLogin(){
        navigation.navigate('Login');
    }

    function showPassword() {
        setPasswordVisibility(!PasswordVisibility);
    }
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
                            <Text style={stylesLogin.textLabels} >Full Name</Text>
                            <TextInput
                                placeholder="Enter your full name"
                                style={fullNameError ? stylesLogin.errorEmail : fullNameValid ? stylesLogin.validEmail : stylesLogin.textInput}
                                onChangeText={(text) => setFullName(text)}
                            />
                        </View>
                        <View style={{ display: fullNameError ? 'flex' : 'none' }}>
                            <Text style={stylesLogin.ErrorMessageText}>Please enter your full name!</Text>
                        </View>
                        <View style={stylesLogin.emailInput}>
                            <Text style={stylesLogin.textLabels} >Email</Text>
                            <TextInput
                                placeholder="Enter your email address"
                                style={ emailError ? stylesLogin.errorEmail : emailValid ? stylesLogin.validEmail : stylesLogin.textInput}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <View style={{display: emailError ? 'flex' : 'none'}}>
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
