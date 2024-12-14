import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({    
    modalButtonContainer: {
        marginTop: 20,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    modalButtonCancelContainer: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#CCCCCC',
        borderWidth: 1,
    },
    modalButtonCancelText: {
        color: 'black',
        textAlign: 'center',
        padding: 20,
        borderRadius: 20,
        fontWeight: 'bold',
    },
    modalButtonLogoutContainer: {
        marginTop: 20,
        backgroundColor: 'red',
        borderRadius: 10,
    },
    modalButtonLogoutText: {
        color: 'white',
        textAlign: 'center',
        padding: 20,
        borderRadius: 20,
        fontWeight: 'bold',
    },
    modalButtonText: {
        color: 'white',
        textAlign: 'center',
        padding: 20,
        borderRadius: 20,
        fontWeight: 'bold',
    },
});
