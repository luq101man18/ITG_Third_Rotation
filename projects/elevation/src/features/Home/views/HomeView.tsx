import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { Modal, PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "../components/card/Card";
import fetchProductsData from "../server/api";
import { styles } from "../styles";
import Header from "../components/header/header";
import FilterView from "../../Filter/views/FilterView";
import Search from "../components/search/Search";
import reactotron from "reactotron-react-native";

export default function HomeView() {
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [filterVisibility, setFilterVisibility] = useState(false);

    const displayFilter = () => {
        setFilterVisibility(!filterVisibility);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProductsFromApi = await fetchProductsData();
                if (fetchedProductsFromApi) {
                    setFetchedProducts(fetchedProductsFromApi.products);
                } else {
                    Alert.alert("Product data not available.");
                }
            } catch (error) {
                Alert.alert("An error occurred while fetching products.");
            }
        };
        fetchProducts();
    }, []);

    return (
        <PaperProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <Header />
                <Search filterVisibility={displayFilter} />
                <FlatList
                    style={styles.container}
                    numColumns={2}
                    data={fetchedProducts}
                    renderItem={({ item }) => (
                        <View style={styles.product}>
                            <ProductCard product={item} />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
                {filterVisibility ? <FilterView products={fetchedProducts} setProducts={setFetchedProducts} /> : <View />}

            </SafeAreaView>
        </PaperProvider>
    );
}
