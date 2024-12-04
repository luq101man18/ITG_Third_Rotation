import { StyleSheet } from 'react-native';


export const styles =  StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    price: {
        marginLeft: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#808080',
    },
    discountColor: {
        color: 'red',
    },
    title: {
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
        color: 'black',
        fontSize: 16,
        flex: 1,
    },
    displayPriceAndDiscount:{
        flexDirection: 'row',
    },
});
