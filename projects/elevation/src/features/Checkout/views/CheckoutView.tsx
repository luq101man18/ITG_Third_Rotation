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
import { Address } from '../../Address/server/api';
import { fetchAddressesById } from '../../Address/server/api';
export default function CheckoutView({ navigation }) {

    const [cartProducts, setCartProducts] = useState<product[]>([]);
    const [address, setAddress] = useState<Address>();
    const [cardPaymentMethod, setCardPaymentMethod] = useState(true);
    const [cashPaymentMethod, setCashPaymentMethod] = useState(false);
    const [applePayPaymentMethod, setApplePayPaymentMethod] = useState(false);

    const selectProductsFromSlice = useAppSelector(selectProducts);
    const selectUserIdFromSlice = useAppSelector(selectUserId);

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
        const callFetchAddresses = async (receivedUserId: number) => {
            try {
                if (receivedUserId) {
                    const retrievedUserAddresses: Address = await fetchAddressesById(receivedUserId);
                    if (retrievedUserAddresses) { setAddress(retrievedUserAddresses); }
                }
            } catch (error) {
                return 'ERROR: Couldn\'t retrieve addresses';
            }
        };
        callFetchAddresses(selectUserIdFromSlice);
        fetchCartProducts();

    }, [selectProductsFromSlice, selectUserIdFromSlice]);

    function goToHome() {
        navigation.navigate('Home');
    }
    function goToCart() {
        navigation.navigate('Cart');
    }
    function goToAddress() {
        navigation.navigate('Address', { userId: selectUserIdFromSlice });
    }


    return (
        <SafeAreaView style={{flex: 1}}>
                <View style={styles.screenHeaderAndArrow}>
                    <View style={styles.headerArrowIcon}>
                        <IconButton
                            icon={'arrow-left'}
                            size={30}
                            iconColor='black'
                            onPress={() => goToCart()}
                        />
                    </View>
                    <Header />
                </View>
                <View style={{flex: 1}}>
                    <View style={styles.screenBody}>
                        <View style={{marginHorizontal: 20,}}>
                            {address ?
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.deliveryAddressTitleText}>Delivery Address</Text>
                                        <TouchableOpacity onPress={() => { goToAddress(); }}>
                                            <Text style={styles.changeAddressButtonText}>Change</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <View style={{ marginHorizontal: -20, }}>
                                            <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                                <IconButton
                                                    icon={'map-marker-outline'}
                                                    size={30}
                                                />
                                                <View style={{ marginVertical: 10 }}>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Home</Text>
                                                    <Text lineBreakMode='tail' numberOfLines={1} style={{ width: 215, color: 'black' }}>{address.address}, {address.city}, {address.state}, {address.country}, {address.postalCode}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View />
                            }
                        </View>
                        {/* payment */}
                        <View style={{marginHorizontal: 20,}}>
                                <View style={{flexDirection: 'column'}}>
                                    <View>
                                        <Text style={styles.paymentMethodText}>Payment Method</Text>
                                    </View>
                                    <ScrollView horizontal={true}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View>
                                                <TouchableOpacity onPress={() => {
                                                    setCardPaymentMethod(true);
                                                    setCashPaymentMethod(false);
                                                    setApplePayPaymentMethod(false);
                                                }} style={{ backgroundColor: cardPaymentMethod ? 'black' : 'white', borderRadius: 10, }}>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <IconButton
                                                            icon={'card-text'}
                                                            size={20}
                                                            iconColor= {cardPaymentMethod ? 'white' : 'black'}
                                                        />
                                                        <Text style={[styles.paymentMethodCard, {color: cardPaymentMethod ? 'white' : 'black'}]}>Card</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={() => {
                                                    setCardPaymentMethod(false);
                                                    setCashPaymentMethod(true);
                                                    setApplePayPaymentMethod(false);
                                            }} style={{ backgroundColor: cashPaymentMethod ? 'black' : 'white', marginHorizontal: 10, borderRadius: 10, }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <IconButton
                                                            icon={'cash'}
                                                            size={27}
                                                            iconColor={cashPaymentMethod ? 'white' : 'black'}
                                                        />
                                                    <Text style={[styles.paymentMethodCash, { color: cashPaymentMethod ? 'white' : 'black' }]}>Cash</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={() => {
                                                    setCardPaymentMethod(false);
                                                    setCashPaymentMethod(false);
                                                    setApplePayPaymentMethod(true);
                                            }} style={{ backgroundColor: applePayPaymentMethod ? 'black' : 'white', borderRadius: 10, }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <IconButton
                                                            icon={'apple'}
                                                            size={25}
                                                            iconColor={applePayPaymentMethod ? 'white' : 'black'}
                                                        />
                                                    <Text style={[styles.paymentMethodApplePay, { color: applePayPaymentMethod ? 'white' : 'black' }]}>Apple Pay</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </ScrollView>
                                    <View style={{ flexDirection: 'row' }}>
                                        
                                    </View>
                                </View>
                        </View>
                        {/* end payment  */}
                        <View style={{ marginHorizontal: 20, }}>
                            <View>
                                <Text style={styles.orderSummary}>Order Summary</Text>
                            </View>
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
                                    <Text style={styles.checkoutButtonText}>Place Order </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{position: 'absolute', marginTop: 725, right: 380,}}>
                            <Footer navigation={navigation}/>
                        </View>
                    </View>
                </View>
        </SafeAreaView>

    );
}
