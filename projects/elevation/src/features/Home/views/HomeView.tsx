import React from "react";
import { View, Text, FlatList } from "react-native";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "../components/card/Card";
import { useEffect, useState } from "react";
import fetchProductsData from "../server/api";
import { Alert } from "react-native";
import { styles } from "../styles";
import Search from "../components/search/Search";
import reactotron from "reactotron-react-native";
export default function HomeView() {

    // const accessTokenRedux = useAppSelector((state : RootState) => {return state.authentication.accessToken;});
    // const refreshTokenRedux = useAppSelector((state: RootState) => {return state.authentication.refreshToken; });
    const {user, error, status} = useAppSelector((state) => {return state.authentication;});
    const [fetchedProducts, setFetchedProducts] = useState([]);
    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const fetchedProductsFromApi = await fetchProductsData();
                if (fetchedProductsFromApi) {
                    setFetchedProducts(fetchedProductsFromApi.products);
                } else {
                    Alert.alert("product wasn't set yet");
                }
            };
            fetchProducts();
        } catch (error) {
            Alert.alert("there is an error");
        }
    }, []);

    return(
        <PaperProvider>
            <SafeAreaView style={{flex: 1}}>
                <Text style={{fontSize:30,color: 'black'}}>
                    here is the name: {user.firstName}
                </Text>
                <FlatList
                    style={styles.container}
                    numColumns={2}
                    data={fetchedProducts}
                    renderItem={({item}) => {return(
                        <View style={styles.product}>
                            <ProductCard product={item} />
                        </View>
                    );} }
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </PaperProvider>
    );
}
