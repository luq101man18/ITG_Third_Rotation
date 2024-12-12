import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { styles } from "./styles";
import { useAppDispatch } from '../../../../hooks/hooks';

const OrderProduct = ({ product }) => {
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
                        </View>
                        <View style={styles.iconAndQuantity}>
                            <Text style={styles.price}>$ {product.price}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.productQuantityNumber}>
                                    Quantity: {product.quantity}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    );
};

export default OrderProduct;
