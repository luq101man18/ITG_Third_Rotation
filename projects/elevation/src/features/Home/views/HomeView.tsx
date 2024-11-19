import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "../components/card/Card";
import fetchProductsData from "../server/api";
import { styles } from "../styles";
import Header from "../components/header/header";
import FilterView from "../../Filter/views/FilterView";
import Search from "../components/search/Search";
import reactotron from "reactotron-react-native";
import { RotateInDownLeft } from "react-native-reanimated";
import { fetchProducts } from "../redux/ProductsSlice";

export default function HomeView({ navigation }) {
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [filterVisibility, setFilterVisibility] = useState(false);
    const dispatch = useAppDispatch();
    const displayFilter = () => {
        setFilterVisibility(!filterVisibility);
    };

    //navigate to product screen details screen
    const goToProductDetailsScreen = (productId : number) => {
        // build screen and use route.
        navigation.navigate('ProductDetails', { chosenProduct: productId });
    };

    useEffect(() => {
        const fetchProductsUsingAsyncThunk = async () => {
            try {
                const fetchedProductsFromApi = await dispatch(fetchProducts());
                if (fetchedProductsFromApi) {
                    setFetchedProducts(fetchedProductsFromApi.payload.products);
                } else {
                    Alert.alert('Product data not available.');
                }
            } catch (error) {
                Alert.alert('An error occurred while fetching products in Front-End.');
            }
        };
        fetchProductsUsingAsyncThunk();
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
                    renderItem={({item}) => {return(
                        <TouchableOpacity onPress={() => goToProductDetailsScreen(item.id)}>
                            <View style={styles.product}>
                                <ProductCard product={item} />
                            </View>
                        </TouchableOpacity>
                    );} }
                    keyExtractor={(item) => item.id}
                />
                {filterVisibility ? <FilterView products={fetchedProducts} setProducts={setFetchedProducts} displayFilter={displayFilter} /> : <View />}

            </SafeAreaView>
        </PaperProvider>
    );
}
