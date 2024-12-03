import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles";
import SearchedProduct from "../searchedProduct/SearchedProducts";
const productSeparator = () => {
    return (
        <View style={styles.productSeparator} />
    );
};
const ProductDisplay = ({ navigation, searchedProducts }) => {

    const goToProductDetailsScreen = (productId: number) => {
        navigation.navigate('ProductDetails', { chosenProduct: productId });
    };

    return(
        <FlatList
            style = { styles.productContainer }
            data = { searchedProducts.products }
            renderItem = {({ item }) => {
                return (
                    <TouchableOpacity onPress={() => goToProductDetailsScreen(item.id)}>
                        <View>
                            <SearchedProduct product={item} />
                        </View>
                    </TouchableOpacity>
                );
            }}
            keyExtractor = {(item) => item.id}
            ItemSeparatorComponent = {() => productSeparator()}
        />
    );
};
export default ProductDisplay;
