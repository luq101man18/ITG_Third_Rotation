import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { styles } from "./styles";
import {IconButton} from 'react-native-paper';
import { useAppDispatch } from '../../../../hooks/hooks';
import { deleteProduct, incrementProductQuantity, decrementProductQuantity } from '../../redux/cartSlice/CartSlice';

const CartProduct = ({ product }) => {
    const dispatch = useAppDispatch();
    return (
        <View style={{borderColor: '#CCCCCC', borderWidth: 1, marginVertical: 10, borderRadius: 10, }}>
            <Card elevation={0} style={styles.container}>
                <View style={{ flexDirection: 'row', borderColor: 'black', }}>
                    <Card.Cover
                        source={{ uri: product.image }}
                        style={{ width: 90, height: 90, marginLeft: 10,}}
                    />
                    <View style={{}} >
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                            <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{product.title}</Text>
                            <IconButton
                                icon={'delete'}
                                iconColor="red"
                                size={20}
                                style={styles.icon}
                                onPress={() => { dispatch(deleteProduct(product.id)); }}
                            />
                        </View>
                        <View style={styles.iconAndQuantity}>
                            <Text style={styles.price}>$ {product.price}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <IconButton
                                    icon={'plus'}
                                    iconColor="black"
                                    size={20}
                                    style={{ marginLeft: 35, borderColor: '#CCCCCC', borderWidth: 1, borderRadius: 5}}
                                    onPress={() => { dispatch(incrementProductQuantity(product.id)); }}
                                />
                                <Text style={styles.productQuantityNumber}>
                                    {product.quantity}
                                </Text>
                                <IconButton
                                    icon={'minus'}
                                    iconColor="black"
                                    size={20}
                                    style={{ borderColor: '#CCCCCC', borderWidth: 1, borderRadius: 5, }}
                                    onPress={() => {dispatch(decrementProductQuantity(product.id));}}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    );
};

export default CartProduct;
