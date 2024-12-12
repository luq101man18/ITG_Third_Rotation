import React from 'react';
import { View, FlatList } from 'react-native';
import { useAppSelector } from '../../../hooks/hooks';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
import { IconButton } from 'react-native-paper';
import { selectProducts } from '../redux/orderSlice/OrderSlice';
import fetchProductViaId from '../server/api';
import { product } from '../redux/orderSlice/OrderSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../component/Header/Header';
import Footer from '../../Home/components/footer/Footer';
import EmptyOrder from '../component/emptyOrder/EmptyOrder';
import OrderProduct from '../component/orderProduct/OrderProduct';
import reactotron from 'reactotron-react-native';

export default function OrderView({ navigation }) {

    const [orderProducts, setOrderProducts] = useState<product[]>([]);
    const selectProductsFromSlice = useAppSelector(selectProducts);

    useEffect(() => {
        const fetchOrderProducts = async () => {
            try {
                const orderProductsFromSlice = selectProductsFromSlice;
                const fetchProductsFromCartHelper = await Promise.all(
                    orderProductsFromSlice.map(async (productFromSlice) => {
                        return await fetchProductViaId(productFromSlice.id);
                    })
                );
                if (fetchProductsFromCartHelper) {
                    reactotron.log(fetchProductsFromCartHelper);
                    const destructureFetchedProductsForCart = fetchProductsFromCartHelper.map((product) => ({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.images[0],
                        quantity: 1,
                    }));
                    orderProductsFromSlice.forEach((productFromSlice) => {
                        destructureFetchedProductsForCart.find((productFromAPI) => {
                            if(productFromAPI.id === productFromSlice.id){
                                productFromAPI.quantity = productFromSlice.quantity;
                            }
                        });
                    });
                    setOrderProducts(destructureFetchedProductsForCart);
                }
            } catch (error) {
                return 'ERROR: Fetching Cart Products at view';
            }
        };
        fetchOrderProducts();

    }, [selectProductsFromSlice]);

    function goToAccount() {
        navigation.navigate('Account');
    }


    return (
        <SafeAreaView style={{flex: 1}}>
                <View style={styles.screenHeaderAndArrow}>
                    <View style={styles.headerArrowIcon}>
                        <IconButton
                            icon={'arrow-left'}
                            size={30}
                            iconColor='black'
                            onPress={() => goToAccount()}
                        />
                    </View>
                    <Header />
                </View>
                <View style={{flex: 1}}>
                    {orderProducts.length > 0 ?
                        (
                            <View style={styles.screenBody}>
                                <FlatList
                                    style={{flex: 1}}
                                    data={orderProducts}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={{}}>
                                                <OrderProduct product={item} />
                                            </View>
                                        );
                                    }}
                                    keyExtractor={(item) => item.id}
                                />
                                <View style={{right: 20,}}>
                                    <Footer navigation={navigation}/>
                                </View>
                            </View>
                        )
                        :
                        (<EmptyOrder navigation={navigation} />)
                    }
                </View>
        </SafeAreaView>

    );
}
