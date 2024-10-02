import React from "react";
import { View, TouchableOpacity, TextInput, Alert } from "react-native";
import { IconButton, Text, MD3Colors } from "react-native-paper";
import { stylesLogin } from "../styles";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

export default function LoginView({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [PasswordVisibility, setPasswordVisibility] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    function goToRegistrationScreen(){
        navigation.navigate('Registration');
    }

    function validateEmailAndPassword() {
        const emailExpression = /\S+@\S+\.\S+/;
        let flag = false;
        if(!email.match(emailExpression)) {
            setEmailError(true);
            flag = true;
            return flag;
        } else if(password.length < 8) {
            setPasswordError(true);
            flag = true;
            return flag;
        } else {
            setEmailError(false);
            setPasswordError(false);
            setEmailValid(true);
            setPasswordValid(true);
            flag = false;
            return flag;
        }
    }
    function processLogin(){
        if(validateEmailAndPassword()){
            return;
        } else {
            Alert.alert("Successfully Logged In!!");
        }
    }

    function showPassword() {
        setPasswordVisibility(!PasswordVisibility);
    }
    return(
        <View style={stylesLogin.container}>
            <View>
                <View style={stylesLogin.header}>
                    <Text style={stylesLogin.title}>Login to your account</Text>
                    <Text style={stylesLogin.welcomingHeader}>It's great to see ou again.</Text>
                </View>
                <View>
                    <View style={stylesLogin.userInputs}>
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
                        <TouchableOpacity style={stylesLogin.loginbutton} onPress={() => processLogin()}>
                            <Text style={stylesLogin.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={stylesLogin.bottom}>
                    <View style={stylesLogin.registerContainer}>
                        <Text style={stylesLogin.registerationText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => goToRegistrationScreen()}>
                            <Text style={{fontWeight:"bold", fontSize: 16}}>Join</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
