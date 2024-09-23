import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { useState } from 'react';
import { StyleSheet } from 'react-native';
export default function ErrorScreen({ navigation }) {

    return (
        <View>
            <View style={styles.stopButton}>
                <Text>Error in logic was encountered!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    stopButton: {
        // other source
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        //
    },
    currentTimeWidget: {
        backgroundColor: '#ff7527',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
});
