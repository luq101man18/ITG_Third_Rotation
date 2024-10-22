import React, { useState } from "react";
import { View, TextInput, Text, Alert, FlatList, SafeAreaView } from "react-native";
import { styles } from "../styles";
import { Icon, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import searchProducts from "../server/api";
import reactotron from "reactotron-react-native";
import SearchedProduct from "../components/searchedProduct/SearchedProducts";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import NotFound from "../components/NotFound/NotFound";



const SearchView = ({ navigation }) => {
    const [product , setProduct] = useState('');

    const [validSearch, setValidSearch] = useState(false);

    const [searchedProducts, setSearchedProducts] = useState([]);

    function goToHome(){
        navigation.navigate('Home');
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
                    style={{alignSelf:'flex-start', marginLeft: 30, marginTop: 25,}}
                    />
                <Text style={styles.header}>Search</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.iconWrapperMagnify}>
                    <IconButton
                        icon={'magnify'}
                        iconColor="#B3B3B3"
                        size={24}
                        onPress={() => searchForProduct(product)}
                    />
                </View>
                <TextInput
                    placeholder="Search for clothes..."
                    placeholderTextColor={'#B3B3B3'}
                    style={styles.textInput}
                    onChangeText={(text) => setProduct(text)}
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
                <Text></Text> : validSearch ?
                <ProductDisplay searchedProducts={searchedProducts} /> : <NotFound />
            }
        </View>
    );
};
export default SearchView;
