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
import { selectUserId } from '../../Login/authentication/redux/authenticationSlice';
export default function CartView({ navigation }) {

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
    function goToCheckout() {
        navigation.navigate('Checkout');
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
                                                <TouchableOpacity style={styles.checkoutButton} onPress={() => { goToCheckout(); }}>
                                                    <Text style={styles.checkoutButtonText}>Go To Checkout </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                />
                                <View style={{right: 20,}}>
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
