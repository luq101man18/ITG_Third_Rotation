import React, { useState } from 'react';
import { View, TextInput, Text, Alert } from 'react-native';
import { styles } from '../styles';
import { IconButton } from 'react-native-paper';
import searchProducts from '../server/api';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import NotFound from '../components/NotFound/NotFound';



const SearchView = ({ navigation }) => {
    const [product , setProduct] = useState('');

    const [validSearch, setValidSearch] = useState(false);

    const [searchedProducts, setSearchedProducts] = useState([]);

    function goToHome(){
        navigation.navigate('Home');
    }
    function goToSearchProduct() {
        if(product !== '' && validSearch) {navigation.navigate('SearchProduct', {productName: product});}
    }
    async function searchForProductOnTextChange(product: string) {
        try {
            if(product.length > 2) {
                setProduct(product);
                const response = await searchProducts(product);
                setSearchedProducts(response);
                if (searchedProducts.total === 0) {
                    setValidSearch(false);
                } else {
                    setValidSearch(true);
                }
                return true;
            }
        } catch (error) {
            Alert.alert('Unfortunately faced an error please contact customer service');
        }
    }

    async function searchForProduct(product : string) {
        try {
            const response = await searchProducts(product);
            setSearchedProducts(response);
            if(searchedProducts.total === 0) {
                setValidSearch(false);
            } else {
                setValidSearch(true);
            }
            return true;
        } catch (error) {
            Alert.alert('Unfortunately faced an error please contact customer service');
        }
    }

    return (
        <View>
            <View style={{flexDirection: 'row', alignItems: "center"}}>
                <IconButton
                    icon={'arrow-left'}
                    iconColor="black"
                    size={30}
                    onPress={() => goToHome()}
                    style={{alignSelf:'flex-start', marginLeft: 20, marginTop:10,}}
                    />
                <Text style={styles.header}>Search</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.iconWrapperMagnify}>
                    <IconButton
                        icon={'magnify'}
                        iconColor="#B3B3B3"
                        size={24}
                        onPress={() => goToSearchProduct()}
                    />
                </View>
                <TextInput
                    placeholder="Search for clothes..."
                    placeholderTextColor={'#B3B3B3'}
                    style={styles.textInput}
                    onChangeText={(text) => searchForProductOnTextChange(text)}
                />
                <View style={styles.iconWrapperMice}>
                    <IconButton
                        icon={'microphone-outline'}
                        iconColor="#B3B3B3"
                        size={24}
                    />
                </View>
            </View>
            {product === '' ?
                <View /> : validSearch ?
                <ProductDisplay searchedProducts={searchedProducts} navigation={navigation}/> : <NotFound />
            }
        </View>
    );
};
export default SearchView;
