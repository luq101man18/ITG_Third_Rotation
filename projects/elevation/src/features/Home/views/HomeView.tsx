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
import { IconButton } from 'react-native-paper';
export default function HomeView({ navigation }) {

    const [fetchedProducts, setFetchedProducts] = useState([]);

    //navigate to product screen details screen
    const goToProductDetailsScreen = (productId : number) => {
        // build screen and use route.
        navigation.navigate('ProductDetails', { chosenProduct: productId });
    };

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
            Alert.alert('there is an error');
        }
    }, []);

    return(
        <PaperProvider>
            <SafeAreaView style={{flex: 1}}>
                <Header />
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
                <IconButton
                    icon={'arrow-left'}
                    size={25}
                    onPress={() => { navigation.navigate("Address", { userId: 1 })}}
                />
            </SafeAreaView>
        </PaperProvider>
    );
}
