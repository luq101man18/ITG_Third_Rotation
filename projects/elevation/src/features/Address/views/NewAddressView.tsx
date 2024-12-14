import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { stylesNewAddress } from '../stylesNewAddress';
import Modal from "react-native-modal";
import Header from '../components/header/header';
import { IconButton, TextInput } from 'react-native-paper';
import { fetchCardsById } from '../server/api';
import { Card } from '../server/api';
import Loader from '../components/loader/Loader';
import { PaymentIcon } from 'react-native-payment-icons';
import Error from '../../Registration/components/errors/Error';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useForm, Controller } from "react-hook-form"
import { Alert } from 'react-native';
import { MessageModal } from '../components/modal/modal';
import reactotron from 'reactotron-react-native';
import { selectUserId } from '../../Login/authentication/redux/authenticationSlice';
export default function NewAddressView({ navigation }) {

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            addressNickname: '',
            fullAddress: '',
        },
    });

    const [congratModalVisible, setCongratModalVisible] = useState(false);
    const addressNickname = watch("addressNickname");
    const fullAddress = watch("fullAddress");
    const selectUserIdFromSlice = useAppSelector(selectUserId);
    function validateInputs() {
    }
    const processAddingNewCard = () => {
        if (addressNickname && fullAddress) {
            validateInputs();
            setCongratModalVisible(true);
        } else {
            Alert.alert('Please Fill All Fields Properly!');
        }
    };
    function goToAddress() {
        navigation.navigate('Address', { userId: selectUserIdFromSlice });
    }

    return (
        <View>
            <View style={stylesNewAddress.screenHeaderAndArrow}>
                <View style={stylesNewAddress.headerArrowIcon}>
                    <IconButton
                        icon={'arrow-left'}
                        size={30}
                        iconColor='black'
                        onPress={() => goToAddress()}
                    />
                </View>
                <Header />
            </View>
            <View style={{ borderColor: '#E6E6E6', borderWidth: 1, marginHorizontal: 40, }} />
            <View style={{marginHorizontal: 20,}}>
                <View style={{flexDirection: 'column'}}>
                    <View style={stylesNewAddress.AddNewAddressContainer}>
                        <Text style={stylesNewAddress.AddNewAddressText}>Add new address</Text>
                    </View>
                    <View style={{}}>
                        <View>
                            <Text style={stylesNewAddress.addressNicknameText} >Address Nickname</Text>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    minLength: 1,
                                    maxLength: 50,
                                }}
                                render={({ field: { onChange } }) => (
                                    <TextInput
                                        placeholder="Enter Your Address Nickname"
                                        style={stylesNewAddress.addressNicknameTextInput}
                                        onChangeText={onChange}
                                        textContentType='name'
                                    />
                                )}
                                name="addressNickname"
                            />
                        </View>
                        {errors.addressNickname &&
                            (<Error message={"Please enter a valid address nickname!"} />)
                        }
                    </View>
                    <View style={{ flexDirection: 'column', marginRight: 5,}}>
                        <View>
                            <View style={stylesNewAddress.fullAddress}>
                                <Text style={stylesNewAddress.fullAddressText} >Full Address</Text>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        minLength: 5,
                                        maxLength: 50,
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <TextInput
                                            placeholder="Enter Your Full Address"
                                            style={stylesNewAddress.fullAddressTextInput}
                                            onChangeText={onChange}
                                            textContentType='fullStreetAddress'
                                        />
                                    )}
                                    name="fullAddress"
                                />
                            </View>
                            {errors.fullAddress &&
                                (<Error message={"Please enter a valid full address!"} />)
                            }
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={stylesNewAddress.AddAddressButton} onPress={handleSubmit(processAddingNewCard)}>
                        <Text style={stylesNewAddress.AddAddressText}>Add Card</Text>
                    </TouchableOpacity>
                </View>
                <MessageModal visibility={congratModalVisible} messageTitle={'Congratulations'} messageBody={'Your new address will be added once reviewed!'} setVisibility={setCongratModalVisible} navigation={navigation}/>
            </View>
        </View>
    );
}
