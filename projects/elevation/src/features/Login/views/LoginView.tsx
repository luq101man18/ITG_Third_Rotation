import React from 'react';
import { View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { IconButton, Text, MD3Colors } from 'react-native-paper';
import { stylesLogin } from '../styles';
import { useState } from 'react';
import { fetchUser, userAuth } from '../authentication/redux/authenticationSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { useForm, Controller } from "react-hook-form"
import Error from '../components/errors/Error';


export default function LoginView({ navigation } ) {
    const [PasswordVisibility, setPasswordVisibility] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });
    
    const dispatch = useAppDispatch();
    const username = watch("username");
    const password = watch("password");

    function goToHome() {
        navigation.navigate('Home');
    }

    function goToRegistrationScreen(){
        navigation.navigate('Registration');
    }

    function showPassword() {
        setPasswordVisibility(!PasswordVisibility);
    }


    // calling the fetch function
    let callFetchDataUserCredentials = async () => {
        if (username && password){
            //pass user object
            const userAuthCredentials: userAuth =  {
                username: username,
                password: password,
            };
            // fetch user using asyncThunk
            const retrievedUserCredentials = await dispatch(fetchUser(userAuthCredentials));
            return retrievedUserCredentials;
        }
    };
    const processLogin = async () => {
        setUsernameValid(true);
        setPasswordValid(true);
        const credentials = await callFetchDataUserCredentials();
        if(credentials){
            if (credentials.payload.message === 'Invalid credentials'){
                Alert.alert('Username or password is wrong!');
            }
            else {
                goToHome();
            }
        } else {
            Alert.alert('Username or password is wrong!');
            return;
        }
    };


    return (
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
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    minLength:3,
                                }}
                                render={({ field: { onChange } }) => (
                                    <TextInput
                                        placeholder='Enter your username'
                                        style={errors.username ? stylesLogin.errorEmail : usernameValid ? stylesLogin.validEmail : stylesLogin.textInput}
                                        onChangeText={onChange}
                                    />
                                )}
                                name="username"
                            />
                            {errors.username && (
                                    <Error message={"Please enter a valid username!"} />
                                )
                            }
                        </View>

                        <View>
                            <Text style={stylesLogin.textLabels} >Password</Text>

                            <View style={stylesLogin.passwordEye}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        minLength: 8,
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <TextInput
                                            placeholder="Enter your password"
                                            style={errors.password ? stylesLogin.errorPasswordNoIcon : passwordValid ? stylesLogin.validPasswordNoIcon : stylesLogin.passwordTextInput}
                                            onChangeText={onChange}
                                            secureTextEntry={!PasswordVisibility}
                                        />
                                    )}
                                    name="password"
                                />
                                <View style={errors.password ? stylesLogin.errorPasswordIcon : passwordValid ? stylesLogin.validPasswordIcon : stylesLogin.eyeIcon}>
                                    <IconButton
                                        icon={PasswordVisibility ? 'eye' : 'eye-off'}
                                        iconColor={MD3Colors.grey}
                                        size={20}
                                        onPress={() => showPassword()}
                                    />
                                </View>
                            </View>
                            {errors.password && (
                                <Error message={"Please enter a valid password!"} />
                                )
                            }
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={stylesLogin.loginbutton} onPress={handleSubmit(processLogin)}>
                            <Text style={stylesLogin.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={stylesLogin.bottom}>
                    <View style={stylesLogin.registerContainer}>
                        <Text style={stylesLogin.registerationText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => goToRegistrationScreen()}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Join</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
