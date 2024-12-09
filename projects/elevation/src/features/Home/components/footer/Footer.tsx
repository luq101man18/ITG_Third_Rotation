import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { IconButton } from 'react-native-paper';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectQuantity } from '../../../Cart/redux/cartSlice/CartSlice';
const Footer = ({ navigation }) => {

    const productsQuantitySelector = useAppSelector(selectQuantity);
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
            <View>
                {productsQuantitySelector ?
                    <View style={{position: 'absolute', marginLeft: 20, zIndex: 10}}>
                        <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft: 30, position: 'absolute', marginTop: 10, zIndex: 10, fontWeight: 'bold', color: 'white'}}>
                            {productsQuantitySelector}
                        </Text>
                            <IconButton
                                icon={'circle'}
                                size={30}
                                style={{ marginLeft: 10, bottom: 10,}}
                                iconColor='red'
                                onPress={() => goToCart()}
                            />
                        </View>
                    </View>
                    :
                    <View />
                }
                <IconButton
                    icon={'cart'}
                    size={30}
                    style={{ justifyContent: 'space-between', marginHorizontal: 17, }}
                    iconColor='black'
                    onPress={() => goToCart()}
                />
            </View>
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
