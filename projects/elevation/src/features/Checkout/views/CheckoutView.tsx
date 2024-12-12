import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
import { IconButton } from 'react-native-paper';
import { selectProducts } from '../../Cart/redux/cartSlice/CartSlice'
import fetchProductViaId from '../server/api';
import { clearCart } from '../../Cart/redux/cartSlice/CartSlice';
import { product } from '../../Cart/redux/cartSlice/CartSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../component/Header/Header';
import Footer from '../../Home/components/footer/Footer';
import { selectUserId } from '../../Login/authentication/redux/authenticationSlice';
import { Address } from '../../Address/server/api';
import { fetchAddressesById } from '../../Address/server/api';
import { PaymentIcon } from 'react-native-payment-icons';
import { Card, fetchCardsById } from '../../Payment/server/api';
import { MessageModal } from '../component/modal/modal';
import { addOrder, FetchingRequirements } from '../../Order/redux/orderSlice/OrderSlice';
import reactotron from 'reactotron-react-native';

export default function CheckoutView({ navigation }) {

    const [cartProducts, setCartProducts] = useState<product[]>([]);
    const [address, setAddress] = useState<Address>();
    const [cardPaymentMethod, setCardPaymentMethod] = useState(true);
    const [cashPaymentMethod, setCashPaymentMethod] = useState(false);
    const [applePayPaymentMethod, setApplePayPaymentMethod] = useState(false);
    const [userBankCard, setUserBankCard] = useState<Card>();
    const [placingOrderModalVisibility, setPlacingOrderModalVisibility] = useState(false);
    const selectProductsFromSlice = useAppSelector(selectProducts);
    const selectUserIdFromSlice = useAppSelector(selectUserId);
    const dispatch = useAppDispatch();
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
        const callFetchCards = async (receivedUserId: number) => {
            try {
                if (receivedUserId) {
                    const retrievedUserCards: Card = await fetchCardsById(receivedUserId);
                    if (retrievedUserCards) { setUserBankCard(retrievedUserCards); }
                }
            } catch (error) {
                return 'ERROR: Couldn\'t retrieve cards';
            }
        };
        callFetchCards(selectUserIdFromSlice);
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
    function processPlacingOrder() {
        selectProductsFromSlice.forEach((productFromSliceToOrder) => {
            const productIdForOrder: FetchingRequirements = { productId: productFromSliceToOrder.id };
            dispatch(addOrder(productIdForOrder));
        });
        setPlacingOrderModalVisibility(true);
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
                        <View style={{ marginHorizontal: 20, marginVertical: 15, }}>
                                <View style={{flexDirection: 'column'}}>
                                    <View style={{ marginVertical: 15, }}>
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
                                    <View style={{ flexDirection: 'row', marginVertical: 15, }}>
                                        {userBankCard && cardPaymentMethod?
                                            <TouchableOpacity onPress={() => {}}>
                                                <View style={{ borderColor: '#E6E6E6', borderRadius: 10, borderWidth: 1,}}>
                                                    <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                                        <View style={{ marginRight: 10, marginLeft: 10, marginTop: 15, }}>
                                                            <PaymentIcon type={userBankCard.cardType} />
                                                        </View>
                                                        <View style={{ marginVertical: 18, }}>
                                                            <Text style={{ width: 200, color: 'black', fontWeight: 'bold' }}>
                                                                **** **** **** {userBankCard.cardNumber?.substring(12)}
                                                            </Text>
                                                        </View>
                                                        <IconButton
                                                            icon={'pencil'}
                                                            size={30}
                                                            iconColor='black'
                                                            onPress={() => {navigation.navigate('Payment');}}
                                                        />
                                                    </View>
                                                </View>

                                            </TouchableOpacity>
                                            : applePayPaymentMethod ?
                                            <View style={{ borderColor: '#E6E6E6', borderRadius: 10, borderWidth: 1, }}>
                                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                                    <IconButton
                                                        icon={'apple'}
                                                        size={30}
                                                        iconColor='black'
                                                        onPress={() => { navigation.navigate('Payment'); }}
                                                    />
                                                    <View style={{ marginVertical: 18, }}>
                                                        <Text style={{ width: 260, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
                                                            Apple Pay
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            :
                                            <View style={{ borderColor: '#E6E6E6', borderRadius: 10, borderWidth: 1, }}>
                                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                                    <View style={{ marginVertical: 18, }}>
                                                        <Text style={{ width: 320, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
                                                            Cash on delivery
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        }
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
                                <TouchableOpacity style={styles.checkoutButton} onPress={() => {processPlacingOrder();}}>
                                    <Text style={styles.checkoutButtonText}>Place Order </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{position: 'absolute', marginTop: 725, right: 380,}}>
                            <Footer navigation={navigation}/>
                        </View>
                    </View>
                </View>
                <MessageModal visibility={placingOrderModalVisibility} messageTitle={'Congratulations'} messageBody={'Your order has been placed!`'} setVisibility={setPlacingOrderModalVisibility} navigation={navigation} />
        </SafeAreaView>

    );
}
