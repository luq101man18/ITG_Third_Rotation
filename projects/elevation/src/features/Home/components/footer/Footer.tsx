import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { IconButton } from 'react-native-paper';

const Footer = ({ navigation }) => {

    function goToHome(){
        navigation.navigate('Home');
    }
    function goToCart() {
        navigation.navigate('Cart');
    }

    return (
        <View style={styles.container}>
            <IconButton
                icon={'home'}
                size={30}
                style={{justifyContent: 'space-between', marginHorizontal: 17,}}
                iconColor='black'
                onPress={() => goToHome()}
            />
            <IconButton
                icon={'magnify'}
                size={30}
                style={{ justifyContent: 'space-between', marginHorizontal: 17, }}
                iconColor='black'
                onPress={() => {}}
            />
            <IconButton
                icon={'heart'}
                size={30}
                style={{ justifyContent: 'space-between', marginHorizontal: 17, }}
                iconColor='black'
                onPress={() => {}}
            />
            <IconButton
                icon={'cart'}
                size={30}
                style={{ justifyContent: 'space-between', marginHorizontal: 17, }}
                iconColor='black'
                onPress={() => goToCart()}
            />
            <IconButton
                icon={'account'}
                size={30}
                style={{ justifyContent: 'space-between', marginHorizontal: 17, }}
                iconColor='black'
                onPress={() => {}}
            />
        </View>
    );
};

export default Footer;
