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

export const sortingProductsByRelevanceAPI = (products) => {
    try {
        let sortedProducts = [...products].sort((product1, product2) =>
            {
                if((product1.rating > product2.rating)
                    && (product1.reviews.length > product2.reviews.length)) {
                    return -1;
                } else if((product1.rating > product2.rating)
                        && (product1.reviews.length < product2.reviews.length)
                        && (product1.discountPercentage > product2.discountPercentage)) {
                    return -1;
                }else if((product1.rating > product2.rating)
                        && (product1.reviews.length < product2.reviews.length)
                        && (product1.discountPercentage < product2.discountPercentage)) {
                    return -1;
                } else {
                    if((product1.reviews.length > product2.reviews.length)) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });
        return sortedProducts;
    } catch (error) {
        return 'Error at fetching the data!';
    }
};

export const filterProductsUsingPriceRange = (products, minPriceRange, maxPriceRange) => {
    try {
        let sortedProducts = [...products].filter((product) => product.price >= minPriceRange && product.price <= maxPriceRange);
        return sortedProducts;
    } catch (error) {
        return 'Error at fetching the data!';
    }
};


export const findHighestPriceProduct = (products) => {
    try {
        let highestPrice = 0;
        products.find((product) =>
            {
                product.price > highestPrice ? highestPrice = product.price : highestPrice;
            }
        );
        return highestPrice;
    } catch (error) {
        return 'Error at finding the highest price!';
    }
};

export const findLowestPriceProduct = (products) => {
    try {
        let highestPrice = findHighestPriceProduct(products);
        products.find((product) =>
            {
                product.price < highestPrice ? highestPrice = product.price : highestPrice;
            }
        );
        return highestPrice;
    } catch (error) {
        return 'Error at finding the lowest price!';
    }
};
