import React from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import styles from "./styles";
import Footer from "../../../Home/components/footer/Footer";
const SavedCart = ({navigation}) => {
    return (
        <View style={{flex: 1,}}>
            <View style={{ flexDirection: "column", marginTop: 100, flex: 1 }}>
                <IconButton
                    icon={'cart-heart'}
                    iconColor="#B3B3B3"
                    size={150}
                    style={styles.icon}
                />
                <Text style={styles.noResultsMain}>No favorites yet!</Text>
                <Text style={styles.noResultsSub}>
                    when you save products, they'll appear here.
                </Text>

            </View>
            <View style={{}}>
                <Footer navigation={navigation} />
            </View>
        </View>
    );
};

export default SavedCart;
