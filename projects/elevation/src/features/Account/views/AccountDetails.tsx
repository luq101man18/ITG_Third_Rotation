import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
import Header from '../component/Header/Header';
import { IconButton, TextInput } from 'react-native-paper';
import Error from '../../Registration/components/errors/Error';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useForm, Controller } from "react-hook-form"
import { Alert } from 'react-native';
import { MessageModal } from '../component/modal/modal';
import reactotron from 'reactotron-react-native';
import { selectUserId } from '../../Login/authentication/redux/authenticationSlice';
import fetchUserViaId, { UserDetails, userDetails } from '../server/api';
import { ScrollView } from 'react-native-gesture-handler';

export default function AccountDetailsView({ route, navigation }) {
    const {userId} = route.params;
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            fullName: '',
            emailAddress: '',
            DOB: '',
            UserGender: '',
            telephone: '',
        },
    });

    const [changesModalVisible, setChangesModalVisible] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const fullName = watch("fullName");
    const emailAddress = watch("emailAddress");
    const DOB = watch("DOB");
    const UserGender = watch("UserGender");
    const telephone = watch("telephone");

    const processAddingNewCard = () => {
        if (fullName && emailAddress && DOB && UserGender && telephone) {
            setChangesModalVisible(true);
        } else {
            Alert.alert('Please Fill All Fields Properly!');
        }
    };

    function goToAccount() {
        navigation.navigate('Account');
    }


    useEffect(() => {
        try {
            const callFetchUserDetails = async (userId: number) => {
                try {
                    if (userId) {
                        const retrievedUserDetails = await fetchUserViaId(userId);
                        if (retrievedUserDetails) {
                            setUserDetails(retrievedUserDetails);
                            const { firstName, lastName, email, phone, birthDate, gender } = retrievedUserDetails;
                            const userDetailsTemp : UserDetails = {
                                fullName: firstName + ' ' + lastName,
                                email: email,
                                phoneNumber: phone,
                                DOB: birthDate,
                                userGender: gender,
                            };
                            setUserDetails(userDetailsTemp);
                        }
                    }
                } catch (error) {
                    return 'ERROR: Couldn\'t retrieve user details';
                }
            };
            callFetchUserDetails(userId);
            reactotron.log(userDetails);
        } catch (error) {
        }
    }, [userId]);


    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View style={styles.screenHeaderAndArrow}>
                <View style={styles.headerArrowIcon}>
                    <IconButton
                        icon={'arrow-left'}
                        size={30}
                        iconColor='black'
                        onPress={() => goToAccount()}
                    />
                </View>
                <Header />
            </View>
            <View style={{ borderColor: '#E6E6E6', borderWidth: 1, marginHorizontal: 40, }} />
            <View style={{ marginHorizontal: 20,}}>
                <View style={{ flexDirection: 'column', }}>
                    <View style={styles.AddNewCreditCardContainer}>
                        <Text style={styles.AddNewCreditCardText}>Account Details</Text>
                    </View>
                    <View style={{ flexDirection: 'column', }}>
                        <View>
                            <Text style={styles.cardNumberText} >Full Name</Text>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    minLength: 5,
                                    maxLength: 50,
                                }}
                                render={({ field: { onChange } }) => (
                                    <TextInput
                                        placeholder= {userDetails?.fullName}
                                        style={styles.cardNumberTextInput}
                                        onChangeText={onChange}
                                        textContentType='name'
                                    />
                                )}
                                name="fullName"
                            />
                        </View>
                        {errors.fullName &&
                            (<Error message={"Please enter a valid name!"} />)
                        }
                    </View>
                    <View style={{ flexDirection: 'column', marginRight: 5, }}>
                        <View>
                            <View style={styles.cardExpiryDate}>
                                <Text style={styles.cardExpiryCodeAndSecurityCodeText} >Date of Birth</Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        minLength: 10,
                                        maxLength: 10,
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <TextInput
                                            placeholder= {userDetails?.DOB}
                                            style={styles.cardSecurityCodeAndExpiryDateTextInput}
                                            onChangeText={onChange}
                                            textContentType='birthdateDay'
                                        />
                                    )}
                                    name="DOB"
                                />
                            </View>
                            {errors.DOB &&
                                (<Error message={"Please enter a valid date of birth!"} />)
                            }
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column',}}>
                        <View>
                            <View style={styles.cardSecurityCode}>
                                <Text style={styles.cardExpiryCodeAndSecurityCodeText} >Email Address</Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        minLength: 13,
                                        maxLength: 50,
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <TextInput
                                            placeholder={userDetails?.email}
                                            style={styles.cardSecurityCodeAndExpiryDateTextInput}
                                            onChangeText={onChange}
                                            textContentType='emailAddress'
                                        />
                                    )}
                                    name="emailAddress"
                                />
                            </View>
                            {errors.emailAddress &&
                                (<Error message={"Please enter a valid email address!"} />)
                            }
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column',}}>
                        <View>
                            <View style={styles.cardSecurityCode}>
                                <Text style={styles.cardExpiryCodeAndSecurityCodeText} >Gender</Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        minLength: 4,
                                        maxLength: 6,
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <TextInput
                                            placeholder={userDetails?.userGender}
                                            style={styles.cardSecurityCodeAndExpiryDateTextInput}
                                            onChangeText={onChange}
                                            textContentType='name'
                                        />
                                    )}
                                    name="UserGender"
                                />
                            </View>
                            {errors.emailAddress &&
                                (<Error message={"Please enter a valid gender!"} />)
                            }
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', }}>
                        <View>
                            <View style={styles.cardSecurityCode}>
                                <Text style={styles.cardExpiryCodeAndSecurityCodeText} >Phone Number</Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        minLength: 8,
                                        maxLength: 16,
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <TextInput
                                            placeholder={userDetails?.phoneNumber}
                                            style={styles.cardSecurityCodeAndExpiryDateTextInput}
                                            onChangeText={onChange}
                                            textContentType='telephoneNumber'
                                        />
                                    )}
                                    name="telephone"
                                />
                            </View>
                            {errors.telephone &&
                                (<Error message={"Please enter a valid phone number!"} />)
                            }
                        </View>
                    </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.AddCardButton} onPress={handleSubmit(processAddingNewCard)}>
                            <Text style={styles.AddCardText}>Submit Changes</Text>
                        </TouchableOpacity>
                    </View>
                    <MessageModal visibility={changesModalVisible} messageTitle={'Done'} messageBody={'Your changes will be reviewed before updating!'} setVisibility={setChangesModalVisible} navigation={navigation} />
                </View>
        </ScrollView>
    );
}
