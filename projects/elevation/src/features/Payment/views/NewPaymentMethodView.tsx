import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
import Header from '../components/header/header';
import { IconButton, TextInput } from 'react-native-paper';
import { fetchCardsById } from '../server/api';
import { Card } from '../server/api';
import Loader from '../components/loader/Loader';
import { PaymentIcon } from 'react-native-payment-icons';
import Error from '../../Registration/components/errors/Error';
import { useAppDispatch } from '../../../hooks/hooks';
import { useForm, Controller } from "react-hook-form"
import { Alert } from 'react-native';
export default function NewPaymentMethodView({ navigation }) {

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            cardNumber: 0,
            cardExpirationDate: 0,
            cardSecurityCode: 0,
        },
    });

    const dispatch = useAppDispatch();
    const cardNumber = watch("cardNumber");
    const cardExpirationDate = watch("cardExpirationDate");
    const cardSecurityCode = watch("cardSecurityCode");

    const processAddingNewCard = () => {
        Alert.alert("Congratulations");
    };
    function goToHome() {
        navigation.navigate('Home');
    }

    return (
        <View>
            <View style={styles.screenHeaderAndArrow}>
                <View style={styles.headerArrowIcon}>
                    <IconButton
                        icon={'arrow-left'}
                        size={30}
                        iconColor='black'
                        onPress={() => goToHome()}
                    />
                </View>
                <Header />
            </View>
            <View style={{ borderColor: '#E6E6E6', borderWidth: 1, marginHorizontal: 40, }} />
            <View style={{marginHorizontal: 20,}}>
                <View style={{flexDirection: 'column'}}>
                    <View style={styles.AddNewCreditCardContainer}>
                        <Text style={styles.AddNewCreditCardText}>Add Debit or Credit Card</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View>
                            <Text style={styles.cardNumberText} >Card Number</Text>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    minLength: 15,
                                    maxLength: 15,
                                }}
                                render={({ field: { onChange } }) => (
                                    <TextInput
                                        placeholder="0000 0000 0000 0000"
                                        style={styles.cardNumberTextInput}
                                        onChangeText={onChange}
                                        textContentType='creditCardNumber'
                                    />
                                )}
                                name="cardNumber"
                            />
                        </View>
                        {errors.cardNumber &&
                            (<Error message={"Please enter a valid card number!"} />)
                        }
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View style={{ flexDirection: 'column', flex: 1, marginRight: 5,}}>
                            <View>
                                <View style={styles.cardExpiryDate}>
                                    <Text style={styles.cardExpiryCodeAndSecurityCodeText} >Expiry Date</Text>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                            minLength: 5,
                                            maxLength: 5,
                                        }}
                                        render={({ field: { onChange } }) => (
                                            <TextInput
                                                placeholder="MM/YY"
                                                style={styles.cardSecurityCodeAndExpiryDateTextInput}
                                                onChangeText={onChange}
                                                textContentType='creditCardExpiration'
                                            />
                                        )}
                                        name="cardExpirationDate"
                                    />
                                </View>
                                {errors.cardExpirationDate &&
                                    (<Error message={"Please enter a valid card expiration date!"} />)
                                }
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <View>
                                <View style={styles.cardSecurityCode}>
                                    <Text style={styles.cardExpiryCodeAndSecurityCodeText} >Security Code</Text>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                            minLength: 3,
                                            maxLength: 3,
                                        }}
                                        render={({ field: { onChange } }) => (
                                            <TextInput
                                                placeholder="CVS"
                                                style={styles.cardSecurityCodeAndExpiryDateTextInput}
                                                onChangeText={onChange}
                                                textContentType='creditCardSecurityCode'
                                            />
                                        )}
                                        name="cardSecurityCode"
                                    />
                                </View>
                                {errors.cardSecurityCode &&
                                    (<Error message={"Please enter a valid card security code!"} />)
                                }
                            </View>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.AddCardButton} onPress={handleSubmit(processAddingNewCard)}>
                            <Text style={styles.AddCardText}>Add Card</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
