import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { styles } from './styles';
import { IconButton } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { addProductToSaved, deleteProductFromSaved, selectSavedProducts } from '../../../Saved/redux/SavedSlice';

export const ProductCard = ({product}) => {
    const discountPercentage = product.discountPercentage;
    const selectProductsFromSavedSlice = useAppSelector(selectSavedProducts);
    const dispatch = useAppDispatch();

    let savedValueBasedOnStore = false;
    const [isSaved, setIsSaved] =  useState(false);
    function processSaved() {
        setIsSaved(!isSaved);
        savedValueBasedOnStore = !isSaved;
        if (savedValueBasedOnStore) {
            dispatch(addProductToSaved({ productId: product.id }));
        } else {
            dispatch(deleteProductFromSaved({ productId: product.id }));
        }
    }
    useEffect(() => {
        if(selectProductsFromSavedSlice.find((productFromSlice) => productFromSlice.id === product.id)) {
            setIsSaved(true);
        }
    }, [selectProductsFromSavedSlice, product.id]);

    return(
        <Card style={styles.container} elevation={0} >
            <View style={styles.saveIcon}>
                <IconButton
                    icon={isSaved ? 'heart' : 'heart-outline'}
                    size={20}
                    onPress={() => processSaved()}
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
