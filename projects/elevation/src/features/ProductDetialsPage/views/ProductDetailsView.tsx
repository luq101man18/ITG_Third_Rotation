import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { styles } from '../styles';
import Header from '../components/header/header';
import {Card} from 'react-native-paper';
import {IconButton} from 'react-native-paper';
import { fetchProductById } from '../server/api';

export default function ProductDetailsView({route, navigation}) {

    const [isSaved, setIsSaved] = useState(false);
    const [small, setSmall] = useState(false);
    const [medium, setMedium] = useState(false);
    const [large, setLarge] = useState(false);

    // get product name
    const { chosenProduct } = route.params;

    // set product name
    const [product, setFetchedProduct] = useState<productId|null>(null);

    // fetch Product function
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
                    Alert.alert("product wasn't set yet");
                }
            };
            fetchReceivedProduct(chosenProduct);
        } catch (error) {
            Alert.alert("there is an error");
        }
    }, [chosenProduct]);

    function goToHome() {
        navigation.navigate('Home');
    }

    return(
        <View>
            <View style={styles.screenHeaderAndArrow}>
                <View style={styles.headerArrowIcon}>
                    <IconButton
                        icon={'arrow-left'}
                        size={25}
                        onPress={() => goToHome()}
                    />
                </View>
                <Header />
            </View>
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
                                <Text>{product.description}</Text>
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
                                    <View style={styles.addToCartButtonContainer}>
                                        <TouchableOpacity style={styles.addToCartButton}>
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
                                </View>
                            </Card>
                        )
                :
                    (<Text>Loading...</Text>)
                }
                </View>
        </View>
    );
}
