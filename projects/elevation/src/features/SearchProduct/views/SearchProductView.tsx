import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCard } from '../components/card/Card';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
import { IconButton } from 'react-native-paper';
import FilterView from '../../Filter/views/FilterView';
import { useAppDispatch } from '../../../hooks/hooks';
import {fetchProducts} from '../redux/SearchedProductsSlice';
import { checkForAppliedFilters } from '../../Home/server/filters/filtersApi';
import { selectSortingFlags, selectPriceRange } from '../redux/SearchedProductsSlice';
import { useAppSelector } from '../../../hooks/hooks';
import Footer from '../../Home/components/footer/Footer';
export default function SearchProductView({navigation, route}) {

    let sortingFlags: boolean[] = useAppSelector(selectSortingFlags);
    let priceRangeValues: number[] = useAppSelector(selectPriceRange);
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const { productName } = route.params;
    const [filterVisibility, setFilterVisibility] = useState(false);
    const dispatch = useAppDispatch();
    const displayFilter = () => {
        setFilterVisibility(!filterVisibility);
    };
    function goToHome() {
        navigation.navigate('Home');
    }
    function goToSearch() {
        navigation.navigate('Search');
    }
    const goToProductDetailsScreen = (productId: number) => {
        navigation.navigate('ProductDetails', { chosenProduct: productId });
    };

    useEffect(() => {
        const fetchProductsUsingAsyncThunk =
            async (productNameForThunk : string) => {
                try {
                    const fetchedProductsFromApi = await dispatch(fetchProducts({ productName: productNameForThunk }));
                    if (fetchedProductsFromApi) {
                        let productsAfterFiltration = checkForAppliedFilters(sortingFlags[0], sortingFlags[1], fetchedProductsFromApi.payload, priceRangeValues[0], priceRangeValues[1]);
                        setFetchedProducts(productsAfterFiltration);
                    } else {
                        return 'ERROR: Product data not available at searched Product.';
                    }
                } catch (error) {
                    return 'ERROR: An error occurred while fetching products in Front-End at searched products.';
                }
            };
        fetchProductsUsingAsyncThunk(productName);
    }, [priceRangeValues, productName, sortingFlags]);

    return(
        <PaperProvider>
            <SafeAreaView style={{flex: 1}}>
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 10,}}>
                    <IconButton
                        icon={'arrow-left'}
                        iconColor="black"
                        size={30}
                        onPress={() => goToSearch()}
                        style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 10, }}
                    />
                    <Text style={styles.header}>{productName}</Text>
                    <View style={styles.iconWrapperFilter}>
                        <IconButton
                            icon={'tune-vertical'}
                            iconColor="white"
                            size={24}
                            onPress={() => displayFilter()}
                        />
                    </View>
                </View>
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
                <Footer navigation={navigation}/>
                {filterVisibility ? <FilterView products={fetchedProducts} setProducts={setFetchedProducts} displayFilter={displayFilter} /> : <View />}
            </SafeAreaView>
        </PaperProvider>
    );
}
