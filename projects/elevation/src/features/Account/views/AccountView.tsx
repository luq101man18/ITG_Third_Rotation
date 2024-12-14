import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../component/Header/Header';
import Footer from '../../Home/components/footer/Footer';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectUserId } from '../../Login/authentication/redux/authenticationSlice';
import { LogoutModal } from '../component/logout/LogoutModal';


export default function AccountView({ navigation }) {
    const selectUserIdFromSlice = useAppSelector(selectUserId);
    const [changesLogoutModalVisible, setChangesLogoutModalVisible] =  useState(false);
    function goToHome() {
        navigation.navigate('Home');
    }

    function goToAccountDetails() {
        navigation.navigate('AccountDetails', { userId: selectUserIdFromSlice });
    }

    function goToOrder() {
        navigation.navigate('Order');
    }

    function goToAddress() {
        navigation.navigate('Address', { userId: selectUserIdFromSlice });
    }

    function goToPayment() {
        navigation.navigate('Payment', { userId: selectUserIdFromSlice });
    }


    return (
        <SafeAreaView style={{flex: 1}}>
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
                <View style={{flex: 1}}>
                    <View style={[styles.screenBody, {flex: 1}]}>
                        <View style={{ flexDirection: 'column', flex: 1, }}>
                            <View style={{flexDirection: 'row', marginVertical: 10,}}>
                                <View style={{}}>
                                    <IconButton
                                        icon={'package'}
                                        size={35}
                                        iconColor='black'
                                    />
                                </View>
                                <View style={{left: 20, marginTop: 19,}}>
                                    <Text style={{textAlign: 'center', fontSize: 19, fontWeight: 'bold', color: 'black',}}>My Orders</Text>
                                </View>
                                <View style={{left: 165}}>
                                    <IconButton
                                        icon={'arrow-right'}
                                        size={30}
                                        iconColor='black'
                                        onPress={() => { goToOrder(); }}
                                    />
                                </View>
                            </View>
                            <View style={{borderColor: '#B3B3B3', borderWidth: 1}} />
                            <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                <View style={{}}>
                                    <IconButton
                                        icon={'account-details'}
                                        size={30}
                                        iconColor='black'
                                    />
                                </View>
                                <View style={{ left: 20, marginTop: 19, }}>
                                    <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: 'bold', color: 'black', }}>My Details</Text>
                                </View>
                                <View style={{ left: 165 }}>
                                    <IconButton
                                        icon={'arrow-right'}
                                        size={30}
                                        iconColor='black'
                                        onPress={() => { goToAccountDetails(); }}
                                    />
                                </View>
                            </View>
                            <View style={{ borderColor: '#B3B3B3', borderWidth: 1 }} />
                            <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                <View style={{}}>
                                    <IconButton
                                        icon={'home'}
                                        size={30}
                                        iconColor='black'
                                    />
                                </View>
                                <View style={{ left: 20, marginTop: 19, }}>
                                    <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: 'bold', color: 'black', }}>Address Book</Text>
                                </View>
                                <View style={{ left: 135 }}>
                                    <IconButton
                                        icon={'arrow-right'}
                                        size={30}
                                        iconColor='black'
                                        onPress={() => { goToAddress(); }}
                                    />
                                </View>
                            </View>
                            <View style={{ borderColor: '#B3B3B3', borderWidth: 1 }} />
                            <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                <View style={{}}>
                                    <IconButton
                                        icon={'package'}
                                        size={30}
                                        iconColor='black'
                                    />
                                </View>
                                <View style={{ left: 20, marginTop: 19, }}>
                                    <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: 'bold', color: 'black', }}>Payment Methods</Text>
                                </View>
                                <View style={{ left: 95 }}>
                                    <IconButton
                                        icon={'arrow-right'}
                                        size={30}
                                        iconColor='black'
                                        onPress={() => { goToPayment(); }}
                                    />
                                </View>
                            </View>
                            <View style={{ borderColor: '#B3B3B3', borderWidth: 1 }} />
                            <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                <View style={{}}>
                                    <IconButton
                                        icon={'exit-to-app'}
                                        size={30}
                                        iconColor='red'
                                    />
                                </View>
                                <TouchableOpacity style={{ left: 20, marginTop: 19, }} onPress={() => {setChangesLogoutModalVisible(true);}}>
                                    <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: 'bold', color: 'red', }}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{right: 20,}}>
                            <Footer navigation={navigation}/>
                        </View>
                        <LogoutModal visibility={changesLogoutModalVisible} setVisibility={setChangesLogoutModalVisible} navigation={navigation} />
                    </View>
                </View>
        </SafeAreaView>

    );
}
