import React from "react";
import { View, FlatList } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "../components/card/Card";
import { useEffect, useState } from "react";
import fetchProductsData from "../server/api";
import { Alert } from "react-native";
import { styles } from "../styles";
export default function HomeView() {

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
