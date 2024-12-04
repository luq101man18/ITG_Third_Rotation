import React from "react";
import { FlatList, View } from "react-native";
import { styles } from "../../styles";
import SearchedProduct from "../searchedProduct/SearchedProducts";
const productSeparator = () => {
    return (
        <View style={styles.productSeparator} />
    );
};
const ProductDisplay = ({ searchedProducts }) => {
    return(
        <FlatList
            style = { styles.productContainer }
            data = { searchedProducts.products }
            renderItem = {({ item }) => {
                return (
                    <View>
                        <SearchedProduct product={item} />
                    </View>
                );
            }}
            keyExtractor = {(item) => item.id}
            ItemSeparatorComponent = {() => productSeparator()}
        />
    );
};
export default ProductDisplay;
