import React from "react";
import { View, Text } from "react-native";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import Search from "../components/search/Search";
import { NavigationContainer } from "@react-navigation/native";


export default function HomeView({ navigation }) {
    return(
        <View>
            <Text> Home View </Text>
            <Search navigation={navigation}/>
        </View>
    );
}
