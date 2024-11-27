import React from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import styles from "./styles";
import Footer from "../../../Home/components/footer/Footer";
const EmptyCart = ({navigation}) => {
    return (
        <View>
            <View style={{ flexDirection: "column", marginTop: 100, }}>
                <IconButton
                    icon={'cart'}
                    iconColor="#B3B3B3"
                    size={150}
                    style={styles.icon}
                />
                <Text style={styles.noResultsMain}>Your Cart is Empty!</Text>
                <Text style={styles.noResultsSub}>
                    when you add products, they'll appear here.
                </Text>

            </View>
            <View style={{ position: 'absolute', marginTop: 760, }}>
                <Footer navigation={navigation} />
            </View>
        </View>
    );
};

export default EmptyCart;
