import React, { useEffect } from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";
import { Card, Title } from "react-native-paper";
import { styles } from "./styles";
import { IconButton } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { addProductToSaved, deleteProductFromSaved, selectSavedProducts } from "../../redux/SavedSlice";
import reactotron from "reactotron-react-native";

export const ProductCard = ({product}) => {
    const [isSaved, setIsSaved] =  useState(false);
    const dispatch = useAppDispatch();
    const selectProductsFromSavedSlice = useAppSelector(selectSavedProducts);
    const selectProductsFromSavedSliceFlag = () => {
        if (selectProductsFromSavedSlice.find((productFromSaved) => productFromSaved.id === product.id)) {
            return true;
        } else {
            return false;
        }
    };
    function processSaved(id: number) {
        const stateValue = !isSaved;
        setIsSaved(!isSaved);
        if (stateValue) {
            dispatch(addProductToSaved({ productId: id }));
        } else {
            dispatch(deleteProductFromSaved({ productId: id }));
        }
    }
    useEffect(() => {
        if (selectProductsFromSavedSliceFlag()) {
            setIsSaved(true);
        }
    }, [product.id, selectProductsFromSavedSlice]);
    return(
        <Card style={styles.container} elevation={0} >
            <View style={styles.saveIcon}>
                <IconButton
                    icon={isSaved ? 'heart' : 'heart-outline'}
                    size={20}
                    onPress={() => processSaved(product.id)}
                />
            </View>
            <Card.Cover source={{uri: product.image}} />
            <Card.Title
                title={product.title}
                titleStyle={styles.title}
            />
            <Card.Content>
                <View style={styles.displayPriceAndDiscount}>
                    <Text style={styles.price}>$ {product.price}</Text>
                </View>
            </Card.Content>
        </Card>
    );
};
