import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import Search from "../search/Search";

const Header = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Discover</Text>
            <Search />
        </View>
    );
};

export default Header;
