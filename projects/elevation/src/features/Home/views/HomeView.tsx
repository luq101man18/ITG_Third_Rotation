import React from 'react';
import { View, FlatList } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCard } from '../components/card/Card';
import { useEffect, useState } from 'react';
import fetchProductsData from '../server/api';
import { Alert } from 'react-native';
import { styles } from '../styles';
import Header from '../components/header/header';
export default function HomeView() {

    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);
    const handlePagination = () => {
        setLimit(limit + 10);
        setSkip(0);
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
                    onEndReached={handlePagination}
                    onEndReachedThreshold={0.5}
                />
            </SafeAreaView>
        </PaperProvider>
    );
}
