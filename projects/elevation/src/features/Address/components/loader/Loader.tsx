import React from 'react';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import styles from './styles';
const Loader = () => {
    return (
        <View>
            <View style={{ flexDirection: "column", marginTop: 100, }}>
                <IconButton
                    icon={'book-open'}
                    iconColor="#B3B3B3"
                    size={150}
                    style={styles.icon}
                />
                <Text style={styles.noResultsMain}>Loading...</Text>
                <Text style={styles.noResultsSub}>
                    Wait a moment, your address is writing its autobiography!
                </Text>

            </View>
        </View>
    );
};

export default Loader;
