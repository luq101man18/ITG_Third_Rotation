import { StyleSheet } from 'react-native';


export const styles =  StyleSheet.create({
    container: {
        margin: 10,
        position: 'relative',
    },
    price: {
        fontWeight: 'bold',
    },
    discountColor: {
        color: 'red',
    },
    title: {
        fontWeight: 'bold',
    },
    displayPriceAndDiscount:{
        flexDirection: 'row',
    },
    saveIcon:{
        alignSelf:'flex-end',
        position: 'absolute',
        zIndex: 1,
        backgroundColor:'white',
        borderRadius: 10,
        top: 10,
        right: 10,
    },
});

