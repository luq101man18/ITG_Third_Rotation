import React from "react";
import { View, TextInput } from "react-native";
import { styles } from "./styles";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Search = ({filterVisibility}) => {
    const navigation = useNavigation();
    const goToSearch = () => {
        navigation.navigate('Search');
    };

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.iconWrapperMagnify}>
                    <IconButton
                        icon={'magnify'}
                        iconColor="#B3B3B3"
                        size={24}
                    />
                </View>
                <TextInput
                    placeholder="Search for clothes..."
                    placeholderTextColor={'#B3B3B3'}
                    style={styles.textInput}
                    onFocus={goToSearch}
                />
                <View style={styles.iconWrapperMice}>
                    <IconButton
                        icon={'microphone-outline'}
                        iconColor="#B3B3B3"
                        size={24}
                    />
                </View>
                <View style={styles.iconWrapperFilter}>
                    <IconButton
                        icon={'tune-vertical'}
                        iconColor="white"
                        size={24}
                        onPress={() => filterVisibility()}
                    />
                </View>
            </View>
        </View>
    );
};
export default Search;
