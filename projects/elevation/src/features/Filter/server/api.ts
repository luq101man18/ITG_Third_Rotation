import reactotron from "reactotron-react-native";

export const filterProductsFromLowToHigh = (products) => {
    try {
        let sortedProducts = [...products].sort((product1, product2) => product1.price < product2.price ? -1 : 1);
        return sortedProducts;
    } catch (error) {
        return 'Error at fetching the data!';
    }
};

export const filterProductsFromHighToLow = (products) => {
    try {
        let sortedProducts = [...products].sort((product1, product2) => product1.price > product2.price ? -1 : 1);
        return sortedProducts;
    } catch (error) {
        return 'Error at fetching the data!';
    }
};
