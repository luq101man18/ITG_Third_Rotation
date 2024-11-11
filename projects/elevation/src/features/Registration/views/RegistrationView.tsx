import React from 'react';
import { View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { IconButton, Text, MD3Colors } from 'react-native-paper';
import { stylesLogin } from '../styles';
import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { useForm, Controller } from "react-hook-form"
import Error from '../components/errors/Error';
import { addUser } from '../creation/redux/creationSlice';
import { userCreate } from '../creation/redux/creationSlice';

export default function RegistrationView({ navigation }) {
    const [PasswordVisibility, setPasswordVisibility] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [firstNameValid, setFirstNameValid] = useState(false);
    const [lastNameValid, setLastNameValid] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
        },
    });

    const dispatch = useAppDispatch();
    const username = watch("username");
    const password = watch("password");
    const firstName = watch("firstName");
    const lastName = watch("lastName");

    const processRegistration = async () => {
        setFirstNameValid(true);
        setLastNameValid(true);
        setUsernameValid(true);
        setPasswordValid(true);
        const credentials = await callAddDataUserCredentials();
        if (!credentials) {
            return Alert.alert('Error has occurred! Please contact services or try again later');
        } else {
            goToLogin();
        }
    };

    function goToLogin(){
        navigation.navigate('Login');
    }

    function showPassword() {
        setPasswordVisibility(!PasswordVisibility);
    }

    let callAddDataUserCredentials = async () => {
        if (firstName && lastName && username && password) {
            //pass user object
            const userAuthCredentials: userCreate = {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
            };
            // fetch user using asyncThunk
            const retrievedUserCredentials = await dispatch(addUser(userAuthCredentials));
            return retrievedUserCredentials;
        }
    };


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
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    minLength: 2,
                                }}
                                render={({ field: { onChange } }) => (
                                    <TextInput
                                        placeholder="Enter your first name"
                                        style={errors.firstName ? stylesLogin.errorEmail : firstNameValid ? stylesLogin.validEmail : stylesLogin.textInput}
                                        onChangeText={onChange}
                                        />
                                )}
                                name="firstName"
                                />
                        </View>
                        {errors.username && (
                            <Error message={"Please enter a valid first name!"} />
                            )
                        }
                        <View style={stylesLogin.emailInput}>
                            <Text style={stylesLogin.textLabels} >Last Name</Text>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    minLength: 2,
                                }}
                                render={({ field: { onChange } }) => (
                                    <TextInput
                                        placeholder="Enter your last name"
                                        style={errors.lastName ? stylesLogin.errorEmail : lastNameValid ? stylesLogin.validEmail : stylesLogin.textInput}
                                        onChangeText={onChange}
                                    />
                                )}
                                name="lastName"
                            />
                        </View>
                        {errors.username && (
                            <Error message={"Please enter a valid last name!"} />
                            )
                        }
                        <View style={stylesLogin.emailInput}>
                            <Text style={stylesLogin.textLabels} >Username</Text>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    minLength: 3,
                                }}
                                render={({ field: { onChange } }) => (
                                    <TextInput
                                        placeholder="Enter your username"
                                        style={ errors.username ? stylesLogin.errorEmail : usernameValid ? stylesLogin.validEmail : stylesLogin.textInput}
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
                                        minLength: 3,
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <TextInput
                                            placeholder="Enter your password"
                                            style={errors.password ? stylesLogin.errorPasswordNoIcon : passwordValid ? stylesLogin.validPasswordNoIcon : stylesLogin.passwordTextInput}
                                            onChangeText={onChange}
                                            secureTextEntry = {!PasswordVisibility}
                                        />
                                    )}
                                    name="password"
                                />
                                <View style={errors.password ? stylesLogin.errorPasswordIcon : passwordValid ? stylesLogin.validPasswordIcon : stylesLogin.eyeIcon}>
                                    <IconButton
                                        icon={PasswordVisibility ? "eye" : "eye-off"} 
                                        iconColor={MD3Colors.grey}
                                        size={20}
                                        onPress={() => showPassword()}
                                    />
                                </View>
                            </View>
                            {errors.username && (
                                <Error message={"Please enter a valid password!"} />
                                )
                            }
                        </View>
                    </View>
                    <View>
                        <Text>By signing up you agree to our Terms, Privacy Policy and Cookie Use</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={stylesLogin.registrationbutton} onPress={handleSubmit(processRegistration)}>
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
