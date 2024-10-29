import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 10,
        flexDirection: 'row',
    },
    textInput: {
        padding: 10,
        color: 'black',
        textAlign: 'left',
        borderWidth: 1,
        // borderRadius: 10,
        fontWeight: '400',
        fontSize: 16,
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopColor: '#E6E6E6',
        borderBottomColor: '#E6E6E6',
        flex: 1,
    },
    iconWrapperMagnify: {
        borderWidth: 1,
        borderLeftColor: '#E6E6E6',
        borderRightColor: 'white',
        borderTopColor: '#E6E6E6',
        borderBottomColor: '#E6E6E6',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    iconWrapperMice: {
        borderWidth: 1,
        borderLeftColor: 'white',
        borderRightColor: '#E6E6E6',
        borderTopColor: '#E6E6E6',
        borderBottomColor: '#E6E6E6',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    iconWrapperFilter: {
        backgroundColor: 'black',
        borderRadius: 10,
        marginLeft: 10,
    },
    productContainer: {
        marginTop: 5,
        marginHorizontal: 30,
    },
    productSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: '#E6E6E6',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 75,
        textAlign: 'center',
        flex: 1,
        marginTop: 5,
    },
    noSearch: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
});
