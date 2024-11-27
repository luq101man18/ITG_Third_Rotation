import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { styles } from '../styles';
import Header from '../components/header/header';
import {Card} from 'react-native-paper';
import {IconButton} from 'react-native-paper';
import { fetchAddressesById } from '../server/api';
import { Address } from '../server/api';
import reactotron from 'reactotron-react-native';


export default function AddressView({route, navigation}) {

    // get user id
    const { userId } = route.params;

    // set address
    const [addresses, setAddresses] = useState<Address>();

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
        reactotron.log(addresses);
        console.log(addresses);
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
                <View style={{}}>
                    {addresses ?
                    <Text>{addresses.address}</Text>
                :
                    (<Text>Loading...</Text>)
                }
                </View>
        </View>
    );
}
