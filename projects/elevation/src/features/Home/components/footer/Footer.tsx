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
                size={25}
                style={{justifyContent: 'space-between', marginHorizontal: 17,}}
                onPress={() => goToHome()}
            />
            <IconButton
                icon={'magnify'}
                size={25}
                style={{ justifyContent: 'space-between', marginHorizontal: 17, }}
                onPress={() => {}}
            />
            <IconButton
                icon={'heart'}
                size={25}
                style={{ justifyContent: 'space-between', marginHorizontal: 17, }}
                onPress={() => {}}
            />
            <IconButton
                icon={'cart'}
                size={25}
                style={{ justifyContent: 'space-between', marginHorizontal: 17, }}
                onPress={() => goToCart()}
            />
            <IconButton
                icon={'account'}
                size={25}
                style={{ justifyContent: 'space-between', marginHorizontal: 17, }}
                onPress={() => {}}
            />
        </View>
    );
};

export default Footer;
