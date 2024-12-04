import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useEffect, useState } from 'react';
import { styles } from '../styles';


import { IconButton } from 'react-native-paper';
import reactotron from 'reactotron-react-native';
import EmptyCart from '../component/emptyCart/EmptyCart';
import AddedProduct from '../component/cartProduct/CartProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchingRequirements, fetchProductsForCart } from '../redux/cartSlice/CartSlice';
import { selectProducts } from '../redux/cartSlice/CartSlice';
import fetchProductViaId from '../server/api';
import CartProduct from '../component/cartProduct/CartProduct';
import { product } from '../redux/cartSlice/CartSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../component/Header/Header';
import Footer from '../../Home/components/footer/Footer';
export default function CartView({ navigation }) {

    // get product name
    //const { addedProduct } = route.params;


    // const [completedTaskChecker, checkCompletedTask] = useState(false);

    // const clearHistory = () => {
    //     removeItemFromAsyncStorage();
    // };

    // const getProductsFromStorage = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('added-product-list');

    //         if (jsonValue != null) {
    //             setAddedProductList(JSON.parse(jsonValue));
    //         } else {
    //             return;
    //         }
    //     } catch (e) {
    //         reactotron.log(e);
    //     }
    // };
    // const storeTasksToStorage = async (value: any) => {
    //     try {
    //         getProductsFromStorage();
    //         const newAddedProductList = [...addedProductList, value];
    //         const jsonValue = JSON.stringify(newAddedProductList);
    //         await AsyncStorage.setItem('added-product-list', jsonValue);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // useEffect(() => {
    //     const product = { "id": 1, "title": "Essence Mascara Lash Princess", "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.", "category": "beauty", "price": 9.99, "discountPercentage": 7.17, "rating": 4.94, "stock": 5, "tags": ["beauty", "mascara"], "brand": "Essence", "sku": "RCH45Q1A", "weight": 2, "dimensions": { "width": 23.17, "height": 14.43, "depth": 28.01 }, "warrantyInformation": "1 month warranty", "shippingInformation": "Ships in 1 month", "availabilityStatus": "Low Stock", "reviews": [{ "rating": 2, "comment": "Very unhappy with my purchase!", "date": "2024-05-23T08:56:21.618Z", "reviewerName": "John Doe", "reviewerEmail": "john.doe@x.dummyjson.com" }, { "rating": 2, "comment": "Not as described!", "date": "2024-05-23T08:56:21.618Z", "reviewerName": "Nolan Gonzalez", "reviewerEmail": "nolan.gonzalez@x.dummyjson.com" }, { "rating": 5, "comment": "Very satisfied!", "date": "2024-05-23T08:56:21.618Z", "reviewerName": "Scarlett Wright", "reviewerEmail": "scarlett.wright@x.dummyjson.com" }], "returnPolicy": "30 days return policy", "minimumOrderQuantity": 24, "meta": { "createdAt": "2024-05-23T08:56:21.618Z", "updatedAt": "2024-05-23T08:56:21.618Z", "barcode": "9164035109868", "qrCode": "https://assets.dummyjson.com/public/qr-code.png" }, "images": ["https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"], "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png" };
    //     storeTasksToStorage(product);
    //     getProductsFromStorage();
    // }, []);

    const [cartProducts, setCartProducts] = useState<product[]>([]);
    const selectProductsFromSlice = useAppSelector(selectProducts);
    const totalPrice = 0;

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const cartProductsFromSlice = selectProductsFromSlice;
                const fetchProductsFromCartHelper = await Promise.all(
                    cartProductsFromSlice.map(async (product) => {
                        return await fetchProductViaId(product.id);
                    })
                );
                if (fetchProductsFromCartHelper) {
                    const destructureFetchedProductsForCart = fetchProductsFromCartHelper.map((product) => ({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.images[0],
                        quantity: 1,
                    }));
                    cartProductsFromSlice.forEach((productFromSlice) => {
                        destructureFetchedProductsForCart.find((productFromAPI) => {
                            if(productFromAPI.id === productFromSlice.id){
                                productFromAPI.quantity = productFromSlice.quantity;
                            }
                        });
                    });
                    setCartProducts(destructureFetchedProductsForCart);
                }
            } catch (error) {
                return 'ERROR: Fetching Cart Products at view';
            }
        };
        fetchCartProducts();

    }, [selectProductsFromSlice]);

    function goToHome() {
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
                <View style={styles.screenHeaderAndArrow}>
                    <View style={styles.headerArrowIcon}>
                        <IconButton
                            icon={'arrow-left'}
                            size={30}
                            iconColor='black'
                            onPress={() => goToHome()}
                        />
                    </View>
                    <Header />
                </View>
                <View style={{flex: 1}}>
                    {cartProducts.length > 0 ?
                        (
                            <View style={styles.screenBody}>
                                <FlatList
                                    style={{flex: 1}}
                                    data={cartProducts}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={{}}>
                                                <CartProduct product={item} />
                                            </View>
                                        );
                                    }}
                                    keyExtractor={(item) => item.id}
                                    ListFooterComponent={
                                        <View style={{ marginHorizontal: 20, }}>
                                            <View style={styles.pricesCalculationsContainer}>
                                                <Text style={styles.CartSubTotalPriceText}>Sub-total</Text>
                                                <Text style={styles.CartSubTotalPriceNumber}>$ {cartProducts.reduce(
                                                    (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
                                                    totalPrice,).toFixed(3)}</Text>
                                            </View>
                                            <View style={styles.pricesCalculationsContainer}>
                                                <Text style={styles.CartTotalVATText}>VAT% </Text>
                                                <Text style={styles.CartTotalVATNumber}>$ 0</Text>
                                            </View>
                                            <View style={styles.pricesCalculationsContainer}>
                                                <Text style={styles.CartTotalShippingFeeText}>Shipping fee</Text>
                                                <Text style={styles.CartTotalShippingFeeNumber}>$ 0</Text>
                                            </View>
                                            <View style={{ borderColor: "#B3B3B3", borderWidth: 0.5, }} />
                                            <View style={styles.pricesCalculationsContainer}>
                                                <Text style={styles.CartTotalPriceText}>Total</Text>
                                                <Text style={styles.CartTotalPriceNumber}>$ {cartProducts.reduce(
                                                    (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
                                                    totalPrice,).toFixed(3)}</Text>
                                            </View>
                                            <View>
                                                <TouchableOpacity style={styles.checkoutButton} onPress={() => { }}>
                                                    <Text style={styles.checkoutButtonText}>Go To Checkout </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                />
                                <View style={{position: 'absolute', marginTop: 725, right: 380,}}>
                                    <Footer navigation={navigation}/>
                                </View>
                            </View>
                        )
                        :
                        (<EmptyCart navigation={navigation} />)
                    }
                </View>
        </SafeAreaView>

    );
}
