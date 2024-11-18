import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCard } from '../components/card/Card';
import { useEffect, useState } from 'react';
import fetchProductsData from '../server/api';
import { Alert } from 'react-native';
import { styles } from '../styles';
import Header from '../components/header/header';
import reactotron from 'reactotron-react-native';
import Search from '../components/search/Search';
import { IconButton } from 'react-native-paper';

export default function SearchProductView({navigation, route}) {

    const [fetchedProducts, setFetchedProducts] = useState([]);
    function goToHome() {
        navigation.navigate('Home');
    }
    const {productName} = route.params;

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const fetchedProductsFromApi = await fetchProductsData(productName);
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
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <IconButton
                        icon={'arrow-left'}
                        iconColor="black"
                        size={30}
                        onPress={() => goToHome()}
                        style={{ alignSelf: 'flex-start', marginLeft: 30, marginTop: 10, }}
                    />
                    <Text style={styles.header}>{productName}</Text>
                </View>
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
