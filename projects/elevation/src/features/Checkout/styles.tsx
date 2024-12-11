import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexGrow: 1,
    },
    product: {
        flex: 1,
        margin: 10,
    },
    screenHeaderAndArrow: {
        flexDirection: 'row',
    },
    headerArrowIcon: {
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 20,
    },
    screenBody: {
        marginHorizontal: 30,
        marginTop: 10,
        flex: 1,
    },
    saveIcon: {
        alignSelf: 'flex-end',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        top: 10,
        right: 10,
    },
    screenProductImage: {
        height: 400,
    },
    productTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        marginTop: 10,
    },
    CartSubTotalPriceText: {
        fontSize: 16,
        marginRight: 195,
        justifyContent: 'flex-end',
        color: '#808080',
        fontWeight: 'bold',
    },
    CartSubTotalPriceNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        right: 15,
    },
    CartTotalVATText: {
        fontSize: 16,
        marginRight: 195,
        color: '#808080',
        fontWeight: 'bold',
    },
    CartTotalVATNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        right: 0,
    },
    CartTotalShippingFeeText: {
        fontSize: 16,
        marginRight: 195,
        color: '#808080',
        fontWeight: 'bold',
    },
    CartTotalShippingFeeNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        right: 8,
    },
    CartTotalPriceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#808080',
    },
    CartTotalPriceNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'flex-end',
    },
    checkoutButtonText: {
        color: 'white',
        textAlign: 'center',
        padding: 20,
        borderRadius: 20,
        fontWeight: '600',
    },
    checkoutButton: {
        marginTop: 10,
        marginBottom: 60,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    pricesCalculationsContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
    },
    orderSummary: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    deliveryAddressTitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    changeAddressButtonText: {
        fontSize: 16,
        color: 'black',
        textDecorationLine: 'underline',
    },
    paymentMethodCash: {
        marginTop: 18,
        marginHorizontal: 10,
    },
    paymentMethodCard: {
        marginTop: 15,
        marginHorizontal: 10,
    },
    paymentMethodApplePay: {
        marginTop: 18,
        marginHorizontal: 10,
    },
    paymentMethodText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },

});
