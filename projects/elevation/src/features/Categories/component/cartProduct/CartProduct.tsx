import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { styles } from "./styles";


const AddedProduct = ({ product }) => {
    const discountPercentage = product.discountPercentage;
    return (
        <Card elevation={0} style={styles.container}>

            <View style={{ flexDirection: 'row' }}>
                <Card.Cover
                    source={{ uri: product.images[0] }}
                    style={{ width: 70, height: 70 }}
                />
                <View style={{ flexDirection: 'column' }} >
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.title}>{product.title}</Text>
                        <View>
                            <IconButton
                                icon={'trash-icon'}
                                iconColor="red"
                                size={20}
                                style={styles.icon}
                            />
                        </View>
                    </View>
                    <Text style={{fontSize: 20, color: '#B3B3B3'}}>Size ex: L </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.price}>$ {product.price}</Text>
                        <Text style={{ display: (discountPercentage > 0) ? 'flex' : 'none', color: 'red', fontWeight: "bold" }}> -{discountPercentage}%</Text>
                    </View>
                </View>
            </View>
        </Card>
    );
};

export default AddedProduct;
