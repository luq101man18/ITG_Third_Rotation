
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import  Modal  from 'react-native-modal'
import { IconButton } from 'react-native-paper';
import { styles } from './styles';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectUserId } from '../../../Login/authentication/redux/authenticationSlice';

export const MessageModal = ({ visibility, messageTitle, messageBody, setVisibility, navigation}) => {
    
    const selectUserIdFromSlice = useAppSelector(selectUserId);
    function goBackToAddressView() {
        setVisibility(!visibility);
        navigation.navigate('Address', { userId: selectUserIdFromSlice });
    }
    return (
        <View>
            <Modal isVisible={visibility}>
                <View style={{ backgroundColor: 'white', margin: 50, borderRadius: 10, }}>
                    <View style={{left: 80,}}>
                        <IconButton
                            icon={'check-circle-outline'}
                            size={70}
                            iconColor='green'
                        />
                    </View>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>{messageTitle}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', color: '#666666', textAlign: 'center', marginVertical: 10 }}>{messageBody}</Text>
                    <View style={{margin: 10,}}>
                        <TouchableOpacity style={styles.modalButtonContainer} onPress={() => {goBackToAddressView();}}>
                            <Text style={styles.modalButtonText}>Thanks</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
