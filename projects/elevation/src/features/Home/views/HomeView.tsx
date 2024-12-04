import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCard } from '../components/card/Card';
import { styles } from '../styles';
import Header from '../components/header/header';
import FilterView from '../../Filter/views/FilterView';
import Search from '../components/search/Search';
import { fetchProducts, selectSortingFlags } from '../redux/ProductsSlice';
import { LIMIT_ADDED_PRODUCTS_NUMBER_TO_FETCH, LIMIT_DEFAULT_PRODUCTS_NUMBER_TO_FETCH, SKIP_DEFAULT_PRODUCTS_NUMBER_TO_FETCH, SKIP_PRODUCTS_NUMBER_TO_FETCH } from '../constants/pagination/constants';
import { checkForAppliedFilters } from '../server/filters/filtersApi';
import { selectPriceRange } from '../redux/ProductsSlice';

export default function HomeView({ navigation }) {

    let sortingFlags: boolean[] = useAppSelector(selectSortingFlags);
    let priceRangeValues: number[] = useAppSelector(selectPriceRange);

    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [filterVisibility, setFilterVisibility] = useState(false);
    const dispatch = useAppDispatch();
    const displayFilter = () => {
        setFilterVisibility(!filterVisibility);
    };

    const [limit, setLimit] = useState(LIMIT_DEFAULT_PRODUCTS_NUMBER_TO_FETCH);
    const [skip, setSkip] = useState(SKIP_DEFAULT_PRODUCTS_NUMBER_TO_FETCH);
    const handlePagination = () => {
        setLimit(limit + LIMIT_ADDED_PRODUCTS_NUMBER_TO_FETCH);
        setSkip(SKIP_PRODUCTS_NUMBER_TO_FETCH);
    };

    //navigate to product screen details screen
    const goToProductDetailsScreen = (productId : number) => {
        navigation.navigate('ProductDetails', { chosenProduct: productId });
    };

    useEffect(() => {
        const fetchProductsUsingAsyncThunk =
            async (limit2 : number, priceRangeValues2: number[]) => {
                try {
                    const fetchedProductsFromApi = await dispatch(fetchProducts({ limit: limit2}));
                    if (fetchedProductsFromApi) {
                        let productsAfterFiltration = checkForAppliedFilters(sortingFlags[0], sortingFlags[1], fetchedProductsFromApi.payload, priceRangeValues2[0], priceRangeValues2[1]);
                        setFetchedProducts(productsAfterFiltration);
                    } else {
                        return 'Product data not available.';
                    }
                } catch (error) {
                    return 'An error occurred while fetching products in Front-End.';
                }
        };
        fetchProductsUsingAsyncThunk(limit,priceRangeValues );
    }, [limit, skip, sortingFlags, priceRangeValues]);
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
                    onEndReached={handlePagination}
                />
                {filterVisibility ? <FilterView products={fetchedProducts} setProducts={setFetchedProducts} displayFilter={displayFilter} /> : <View />}

            </SafeAreaView>
        </PaperProvider>
    );
}
