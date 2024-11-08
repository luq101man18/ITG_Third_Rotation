import React from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import styles from "./styles";

const NotFound = () => {
    return(
        <View>
            <View style={{flexDirection:"column"}}>
                <IconButton
                    icon={'magnify'}
                    iconColor="#B3B3B3"
                    size={150}
                    style={styles.icon}
                />
                <Text style={styles.noResultsMain}>No Results Found!</Text>
                <Text style={styles.noResultsSub}>
                    Try a similar word or something more general.</Text>

            </View>
        </View>
    );
};

export default NotFound;
