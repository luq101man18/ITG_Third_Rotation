import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
import Header from '../components/header/header';
import {IconButton} from 'react-native-paper';
import { fetchCardsById } from '../server/api';
import { Card } from '../server/api';
import Loader from '../components/loader/Loader';
import { PaymentIcon } from 'react-native-payment-icons';
export default function PaymentView({route, navigation}) {

    // const { userId } = route.params;
    const userId  = 1;
    const [userBankCards, setuserBankCards] = useState<Card>();
    const [chosenUserBankCards, setChosenUserBankCards] = useState(true);

    useEffect(() => {
        const callFetchCards = async (receivedUserId: number) => {
            try {
                if (receivedUserId) {
                    const retrievedUserCards: Card = await fetchCardsById(receivedUserId);
                    if (retrievedUserCards) { setuserBankCards(retrievedUserCards);}
                }
            } catch (error) {
                return 'ERROR: Couldn\'t retrieve cards';
            }
        };
        callFetchCards(userId);
    }, [userId]);

    function goToCheckout() {
        navigation.navigate('Checkout');
    }
    return(
        <View>
            <View style={styles.screenHeaderAndArrow}>
                <View style={styles.headerArrowIcon}>
                    <IconButton
                        icon={'arrow-left'}
                        size={30}
                        iconColor='black'
                        onPress={() => goToCheckout()}
                    />
                </View>
                <Header />
            </View>
                <View style={{ borderColor: '#E6E6E6', borderWidth: 1, marginHorizontal: 40,}} />
                <View style={{}}>
                    {userBankCards ?
                    <TouchableOpacity onPress={() => { setChosenUserBankCards(!chosenUserBankCards);}}>
                        <View style={{margin: 40,}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Saved Cards</Text>
                        </View>
                        <View style={{borderColor: '#E6E6E6', borderRadius: 10, borderWidth: 1, marginHorizontal: 40,}}>
                            <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                <View style={{ marginRight: 15, marginLeft: 10, marginTop: 15,}}>
                                    <PaymentIcon type={userBankCards.cardType} />
                                </View>
                                <View style={{marginVertical: 18,}}>
                                    <Text style={{width: 215, color: 'black', fontWeight: 'bold'}}>
                                        **** **** **** {userBankCards.cardNumber?.substring(12)}
                                    </Text>
                                </View>
                                    <IconButton
                                        icon={chosenUserBankCards ? 'radiobox-marked' : 'radiobox-blank'}
                                        size={30}
                                        iconColor='black'
                                    />
                            </View>
                        </View>

                    </TouchableOpacity>
                :
                    (<Loader />)
                }
                </View>
            <View>
                <TouchableOpacity style={styles.AddNewCardButton} onPress={() => { navigation.navigate('NewPaymentMethod')}}>
                    <Text style={styles.AddNewCardText}>Add New Card</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
