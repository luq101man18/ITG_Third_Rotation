import React from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import styles from "./styles";

const EmptyCart = () => {
    return (
        <View>
            <View style={{ flexDirection: "column" }}>
                <IconButton
                    icon={'magnify'}
                    iconColor="#B3B3B3"
                    size={150}
                    style={styles.icon}
                />
                <Text style={styles.noResultsMain}>Your Cart is Empty!</Text>
                <Text style={styles.noResultsSub}>
                    when you add products, they'll appear here.
                </Text>

            </View>
        </View>
    );
};

export default EmptyCart;
