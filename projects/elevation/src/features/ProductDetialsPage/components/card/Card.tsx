import React from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";
import { Card, Title } from "react-native-paper";
import { styles } from "./styles";
import { IconButton } from "react-native-paper";

export const ProductCard = ({product}) => {
    const discountPercentage = product.discountPercentage;
    // const discountPercentage = 0;
    const [isSaved, setIsSaved] =  useState(false);
    function addToSaved(){
        return setIsSaved(!isSaved);
    }
    return(
        <Card style={styles.container} elevation={0} >
            <View style={styles.saveIcon}>
                <IconButton
                    icon={isSaved ? 'heart' : 'heart-outline'}
                    size={20}
                    onPress={() => addToSaved()}
                />
            </View>
            <Card.Cover source={{uri: product.images[0]}} />
            <Card.Title
                title={product.title}
                titleStyle={styles.title}
            />
            <Card.Content>
                <View style={styles.displayPriceAndDiscount}>
                    <Text style={styles.price}>$ {product.price}</Text>
                    <Text style={{display: ( discountPercentage > 0 ) ? 'flex' : 'none', color: 'red', fontWeight:"bold"}}> -{discountPercentage}%</Text>
                </View>
            </Card.Content>
        </Card>
    );
};
