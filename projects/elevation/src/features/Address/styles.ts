import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexGrow:1,
    },
    product: {
        flex: 1,
        margin: 10,
    },
    screenHeaderAndArrow : {
        flexDirection: 'row',
    },
    headerArrowIcon: {
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 20,
    },
    screenBody : {
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom:30,
        flexDirection:'column',
    },
    saveIcon : {
        alignSelf: 'flex-end',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        top: 10,
        right: 10,
    },
    screenProductImage : {
        height: 400,
    },
    productTitle : {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        marginTop: 10,
    },
    ratingAndReview : {
        flexDirection:'row',
        marginLeft: -15,
    },
    ratingScoreAndReviewNumber : {
        flexDirection:'row',
        marginVertical:16,
    },
    ratingScore : {
        fontWeight:'bold',
        color: 'black',
    },
    chooseSizePart : {
        marginVertical: 10,
    },
    chooseSizeText : {
        color: 'black',
        fontWeight:'bold',
        fontSize: 17,
        marginBottom: 5,
    },
    sizeOptionsIcons : {
        flexDirection: 'row',
        marginLeft: -18,
    },
    dividerLine : {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    priceAndAddToCartButton : {
        flexDirection:'row',
        marginBottom: 20,
        alignSelf: 'center',
        alignItems: 'center',
    },
    priceLabelAndNumber : {
        flexDirection: 'column',
        marginLeft: -110,
    },
    priceNumber : {
        fontWeight: 'bold',
        fontSize:20,
        color: 'black',
    },
    addToCartButtonContainer : {
        left: 120,
    },
    addToCartButton : {
        marginTop: 20,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    addToCartButtonTextAndIcon : {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addToCartText : {
        color: 'white',
        textAlign: 'center',
        padding: 20,
        borderRadius: 20,
        fontWeight: 'bold',
    },
    AddNewAddressButton: {
        marginTop: 20,
        backgroundColor: 'black',
        borderRadius: 10,
        marginHorizontal: 40,
    },
    AddNewAddressText: {
        color: 'white',
        textAlign: 'center',
        padding: 20,
        borderRadius: 20,
        fontWeight: 'bold',
    },
});
