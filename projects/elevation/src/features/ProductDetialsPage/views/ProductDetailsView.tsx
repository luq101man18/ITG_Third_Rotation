import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
import Header from '../components/header/header';
import {Card} from 'react-native-paper';
import {IconButton} from 'react-native-paper';
import { fetchProductById } from '../server/api';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { addProduct, decrementProductQuantity, FetchingRequirements, incrementProductQuantity, selectProducts } from '../../Cart/redux/cartSlice/CartSlice';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProductDetailsView({route, navigation}) {
    const dispatch = useAppDispatch();
    const [isSaved, setIsSaved] = useState(false);
    const [small, setSmall] = useState(false);
    const [medium, setMedium] = useState(false);
    const [large, setLarge] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [productQuantity, setProductQuantity] = useState(0);
    const productsInCartSelector = useAppSelector(selectProducts);
    const { chosenProduct } = route.params;
    const [product, setFetchedProduct] = useState<productId|null>(null);
    const callFetchProduct = async (receivedProductId : string) => {
        if (receivedProductId) {
            const productIdNum = parseInt(receivedProductId);
            const retrievedProductDetails = fetchProductById(productIdNum);
            return retrievedProductDetails;
        }
    };

    function addToSaved() {
        setIsSaved(!isSaved);
    }
    function chooseSmall() {
        setMedium(false);
        setLarge(false);
        setSmall(!small);
    }
    function chooseMedium() {
        setSmall(false);
        setLarge(false);
        setMedium(!medium);
    }
    function chooseLarge() {
        setMedium(false);
        setSmall(false);
        setLarge(!large);
    }

    // fetch product
useEffect(() => {
    try {
        const fetchReceivedProduct = async (receivedProduct : string) => {
            const fetchedProductFromApi = await callFetchProduct(receivedProduct);
            if (fetchedProductFromApi) {
                setFetchedProduct(fetchedProductFromApi);
            } else {
                return 'ERROR: PDP, Product wasn\'t set yet';
            }
        };
        fetchReceivedProduct(chosenProduct);
        const productInCart = productsInCartSelector.find(
            (productFromCart) => productFromCart.id === chosenProduct
        );
        if(productInCart){
            setIsInCart(true);
            setProductQuantity(productInCart.quantity);
        } else {
            setIsInCart(false);
        }
    } catch (error) {
        return 'ERROR: PDP screen failed.';
    }
}, [chosenProduct, productsInCartSelector]);

    function goToHome() {
        navigation.navigate('Home');
    }
    function addToCart(productFromPDP: number) {
        const productIdFromPDP : FetchingRequirements = {productId: productFromPDP};
        dispatch(addProduct(productIdFromPDP));
    }

    return(
        <View>
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
            <ScrollView contentContainerStyle={{paddingBottom: 50,}}>
                <View style={styles.screenBody}>
                    {product ?
                        (
                            <Card elevation={0}>
                            <View style={styles.saveIcon}>
                                    <IconButton
                                        icon={isSaved ? 'heart' : 'heart-outline'}
                                        size={20}
                                        onPress={() => addToSaved()}
                                    />
                                </View>
                                <Card.Cover source={{ uri: product.images[0] }} style={styles.screenProductImage}/>
                                <Text style={styles.productTitle}>
                                    {product.title}
                                </Text>
                                <View style={styles.ratingAndReview}>
                                    <View>
                                        <IconButton
                                            icon={'star'}
                                            size={20}
                                            iconColor="#FFA928"
                                        />
                                    </View>
                                    <View style={styles.ratingScoreAndReviewNumber}>
                                        <Text style={styles.ratingScore}>{product.rating}/5</Text>
                                        <Text> ({product.reviews.length} reviews)</Text>
                                    </View>
                                </View>
                                <Text style={{color: '#808080'}}>{product.description}</Text>
                                <View>
                                    <View style={styles.chooseSizePart}>
                                        <Text style={styles.chooseSizeText}>Choose size</Text>
                                        <View style={styles.sizeOptionsIcons}>
                                            <IconButton
                                                icon={small ? 'alpha-s-box' : 'alpha-s-box-outline'}
                                                size={30}
                                                iconColor="black"
                                                onPress={() => chooseSmall()}
                                            />
                                            <IconButton
                                                icon={medium ? 'alpha-m-box' : 'alpha-m-box-outline'}
                                                size={30}
                                                iconColor="black"
                                                onPress={() => chooseMedium()}
                                            />
                                            <IconButton
                                                icon={large ? 'alpha-l-box' : 'alpha-l-box-outline'}
                                                size={30}
                                                iconColor="black"
                                                onPress={() => chooseLarge()}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.dividerLine} />
                                </View>
                                <View style={styles.priceAndAddToCartButton}>
                                    <View style={styles.priceLabelAndNumber}>
                                        <Text>Price</Text>
                                        <View>
                                        <Text style={styles.priceNumber}>
                                                $ {(product.price - (product.price * product.discountPercentage * 0.01)).toPrecision(3)}
                                            </Text>
                                        </View>
                                    </View>
                                    {isInCart ?
                                        <View style={styles.addToCartButtonContainer}>
                                            <View style={styles.addToCartButton}>
                                                <View style={styles.addToCartButtonTextAndIcon}>
                                                    <TouchableOpacity>
                                                        <IconButton
                                                            icon={'plus'}
                                                            size={30}
                                                            iconColor="white"
                                                            onPress={() => { dispatch(incrementProductQuantity(product.id)); }}
                                                        />
                                                    </TouchableOpacity>
                                                    <Text style={styles.addToCartText}>
                                                        In Cart {productQuantity}
                                                    </Text>
                                                    <TouchableOpacity>
                                                        <IconButton
                                                            icon={'minus'}
                                                            size={30}
                                                            iconColor="white"
                                                            onPress = {() => {dispatch(decrementProductQuantity(product.id)); }}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View style={styles.addToCartButtonContainer}>
                                            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(product.id)}>
                                                <View style={styles.addToCartButtonTextAndIcon}>
                                                    <IconButton
                                                        icon={'basket-outline'}
                                                        size={30}
                                                        iconColor="white"
                                                    />
                                                        <Text style={styles.addToCartText}>
                                                            Add to Cart
                                                        </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            </Card>
                        )
                    :
                        (<Text>Loading...</Text>)
                    }
                </View>
            </ScrollView>
        </View>
    );
}
