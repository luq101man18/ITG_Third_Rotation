import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCard } from '../components/card/Card';
import { useEffect, useState } from 'react';
import fetchProductsData from '../server/api';
import { Alert } from 'react-native';
import { styles } from '../styles';
import Header from '../components/header/header';
import Search from '../components/search/Search';
import { LIMIT_ADDED_PRODUCTS_NUMBER_TO_FETCH, LIMIT_DEFAULT_PRODUCTS_NUMBER_TO_FETCH, SKIP_DEFAULT_PRODUCTS_NUMBER_TO_FETCH, SKIP_PRODUCTS_NUMBER_TO_FETCH } from '../constants/pagination/constants';

export default function HomeView({ navigation }) {

    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [limit, setLimit] = useState(LIMIT_DEFAULT_PRODUCTS_NUMBER_TO_FETCH);
    const [skip, setSkip] = useState(SKIP_DEFAULT_PRODUCTS_NUMBER_TO_FETCH);
    const handlePagination = () => {
        setLimit(limit + LIMIT_ADDED_PRODUCTS_NUMBER_TO_FETCH);
        setSkip(SKIP_PRODUCTS_NUMBER_TO_FETCH);
    };
    const goToProductDetailsScreen = (productId : number) => {
        navigation.navigate('ProductDetails', { chosenProduct: productId });
    };

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const fetchedProductsFromApi = await fetchProductsData(limit, skip);
                if (fetchedProductsFromApi) {
                    setFetchedProducts(fetchedProductsFromApi.products);
                } else {
                    Alert.alert("product wasn't set yet");
                }
            };
            fetchProducts();
        } catch (error) {
            Alert.alert('there is an error');
        }
    }, [limit, skip]);

    return(
        <PaperProvider>
            <SafeAreaView style={{flex: 1}}>
                <Header />
                <Search />
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
                    onEndReached={handlePagination}
                />
            </SafeAreaView>
        </PaperProvider>
    );
}
