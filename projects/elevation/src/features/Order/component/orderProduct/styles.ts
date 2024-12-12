import { StyleSheet } from 'react-native';


export const styles =  StyleSheet.create({
    container: {
        marginVertical: 20,
        borderColor: 'black',
    },
    price: {
        marginLeft: 20,
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
    discountColor: {
        color: 'red',
    },
    title: {
        fontWeight: 'bold',
        marginLeft: 20,
        color: 'black',
        fontSize: 16,
        paddingRight: 20,
        maxWidth: 180,
    },
    displayPriceAndDiscount:{
        flexDirection: 'row',
    },
    icon: {
        // marginTop: 6, //13
        // marginLeft: 80,
        marginTop:0,
        // flex: 1,
    },
    iconAndQuantity: {
        flexDirection: 'row',
    },
    productQuantityText: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 16,
    },
    productQuantityNumber: {
        marginTop: 10,
        left: 70,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
});
