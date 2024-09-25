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
