import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCard } from '../components/card/Card';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
import { IconButton } from 'react-native-paper';
import { useAppDispatch } from '../../../hooks/hooks';
import { useAppSelector } from '../../../hooks/hooks';
import Footer from '../../Home/components/footer/Footer';
import { product, selectSavedProducts } from '../redux/SavedSlice';
import reactotron from 'reactotron-react-native';
import EmptySaved from '../components/emptySaved/EmptySaved';
import fetchProductViaId from '../server/api';

export default function SavedView({navigation}) {

    const selectSavedProductsFromSlice = useAppSelector(selectSavedProducts);
    const [fetchedProducts, setFetchedProducts] = useState<product[]>([]);

    function goToHome() {
        navigation.navigate('Home');
    }
    const goToProductDetailsScreen = (productId: number) => {
        navigation.navigate('ProductDetails', { chosenProduct: productId });
    };

    useEffect(() => {
        const fetchSavedProducts = async () => {
            try {
                const ProductsFromSlice = selectSavedProductsFromSlice;
                const fetchProductsFromSavedHelper = await Promise.all(
                    ProductsFromSlice.map(async (product) => {
                        return await fetchProductViaId(product.id);
                    })
                );
                if (fetchProductsFromSavedHelper) {
                    const destructureFetchedProductsForCart = fetchProductsFromSavedHelper.map((product) => ({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.images[0],
                    }));
                    setFetchedProducts(destructureFetchedProductsForCart);
                }
            } catch (error) {
                return 'ERROR: Fetching Cart Products at view';
            }
        };
        fetchSavedProducts();
    }, [selectSavedProductsFromSlice]);

    return(
        <View style={{flex: 1}}>
            <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 10,}}>
                <View style={{left: 20, top: 5,}} >
                    <IconButton
                        icon={'arrow-left'}
                        iconColor="black"
                        size={30}
                        onPress={() => {goToHome();}}
                    />
                </View>
                <Text style={styles.header}>Saved Items</Text>
            </View>
            {fetchedProducts.length > 0 ?
                <FlatList
                    style={styles.container}
                    numColumns={2}
                    data={fetchedProducts}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => goToProductDetailsScreen(item.id)}>
                                <View style={styles.product}>
                                    <ProductCard product={item} />
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            :
                <EmptySaved navigation={navigation}/>
            }
            <Footer navigation={navigation}/>
        </View>
    );
}
