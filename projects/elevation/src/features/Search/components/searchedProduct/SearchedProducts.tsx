import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { styles } from "./styles";


const SearchedProduct = ({product}) => {
    const discountPercentage = product.discountPercentage;
    return(
        <Card elevation={0} style={styles.container}>

            <View style={{ flexDirection: 'row' }}>
                <Card.Cover
                    source={{ uri: product.images[0] }}
                    style={{width: 70, height: 70}}
                />
                <View style={{ flexDirection: 'column'}} >
                    <Text style={styles.title}>{product.title}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.price}>$ {product.price}</Text>
                        <Text style={{ display: (discountPercentage > 0) ? 'flex' : 'none', color: 'red', fontWeight: "bold" }}> -{discountPercentage}%</Text>
                    </View>
                </View>
            </View>
        </Card>
    );
};

export default SearchedProduct;
