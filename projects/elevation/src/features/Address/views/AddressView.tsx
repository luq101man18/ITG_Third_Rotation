import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
import Header from '../components/header/header';
import {IconButton} from 'react-native-paper';
import { fetchAddressesById } from '../server/api';
import { Address } from '../server/api';
import Loader from '../components/loader/loader';

export default function AddressView({route, navigation}) {

    // get user id
    const { userId } = route.params;

    // set address
    const [addresses, setAddresses] = useState<Address>();

    // chosen address state
    const [chosenAddress, setChosenAddress] = useState(true);

    // fetch address function
    useEffect(() => {
        const callFetchAddresses = async (receivedUserId: number) => {
            try {
                if (receivedUserId) {
                    const retrievedUserAddresses : Address = await fetchAddressesById(receivedUserId);
                    if (retrievedUserAddresses) { setAddresses(retrievedUserAddresses);}
                }
            } catch (error) {
                return 'ERROR: Couldn\'t retrieve addresses';
            }
        };
        callFetchAddresses(userId);
    }, [userId]);

    function goToHome() {
        navigation.navigate('Home');
    }

    return(
        <View>
            <View style={styles.screenHeaderAndArrow}>
                <View style={styles.headerArrowIcon}>
                    <IconButton
                        icon={'arrow-left'}
                        size={25}
                        onPress={() => goToHome()}
                    />
                </View>
                <Header />
            </View>
                <View style={{ borderColor: '#E6E6E6', borderWidth: 1, marginHorizontal: 40,}} />
                <View style={{}}>
                    {addresses ?
                    <TouchableOpacity onPress={() => {setChosenAddress(!chosenAddress);}}>
                        <View style={{margin: 40,}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Saved addresses</Text>
                        </View>
                        <View style={{borderColor: '#E6E6E6', borderRadius: 10, borderWidth: 1, marginHorizontal: 40,}}>
                            <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                <IconButton
                                    icon={'map-marker-outline'}
                                    size={30}
                                />
                                <View style={{marginVertical: 10}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>Home</Text>
                                    <Text lineBreakMode='tail' numberOfLines={1} style={{width: 215, }}>{addresses.address}, {addresses.city}, {addresses.state}, {addresses.country}, {addresses.postalCode}</Text>
                                </View>
                                <IconButton
                                    icon={chosenAddress ? 'radiobox-marked' : 'radiobox-blank'}
                                    size={30}
                                />
                            </View>
                        </View>

                    </TouchableOpacity>
                :
                    (<Loader />)
                }
                </View>
        </View>
    );
}
