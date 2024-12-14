
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import  Modal  from 'react-native-modal'
import { IconButton } from 'react-native-paper';
import { styles } from './styles';

export const LogoutModal = ({ visibility, setVisibility, navigation}) => {
    function goBackToAccountView() {
        setVisibility(!visibility);
        navigation.navigate('Account');
    }
    function goBackToLogin() {
        setVisibility(!visibility);
        navigation.navigate('Login');
    }
    return (
        <View>
            <Modal isVisible={visibility}>
                <View style={{ backgroundColor: 'white', margin: 50, borderRadius: 10, }}>
                    <View style={{left: 80,}}>
                        <IconButton
                            icon={'alert-circle-outline'}
                            size={70}
                            iconColor='red'
                        />
                    </View>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>Logout?</Text>
                    <Text style={{ fontSize: 15, fontWeight: '400', color: '#666666', textAlign: 'center', marginVertical: 10 }}>Are you sure you want to logout?</Text>
                    <View style={{margin: 10, flexDirection: 'column'}}>
                        <TouchableOpacity style={styles.modalButtonLogoutContainer} onPress={() => { goBackToLogin();}}>
                            <Text style={styles.modalButtonLogoutText}>Yes, Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButtonCancelContainer} onPress={() => { goBackToAccountView(); }}>
                            <Text style={styles.modalButtonCancelText}>No Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
