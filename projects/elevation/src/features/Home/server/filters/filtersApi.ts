
export const filterProductsFromLowToHigh = (products) => {
    try {
        let sortedProducts = [...products].sort((product1, product2) => product1.price < product2.price ? -1 : 1);
        return sortedProducts;
    } catch (error) {
        return 'Error while sorting from low to high!';
    }
};

export const filterProductsFromHighToLow = (products) => {
    try {
        let sortedProducts = [...products].sort((product1, product2) => product1.price > product2.price ? -1 : 1);
        return sortedProducts;
    } catch (error) {
        return 'Error while sorting from high to low!';
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
        return 'Error while sorting by relevance!';
    }
};

export const filterProductsUsingPriceRange = (products, minPriceRange, maxPriceRange) => {
    try {

        let sortedProducts = [...products].filter((product) => product.price >= minPriceRange && product.price <= maxPriceRange);
        return sortedProducts;
    } catch (error) {
        return 'Error while filtering by price range!';
    }
};

export const findHighestPriceProduct = (products) => {
    try {
        let highestPrice = 0;
        products.forEach((product) =>
            {
                product.price > highestPrice ? highestPrice = product.price : highestPrice;
            }
        );
        return highestPrice;
    } catch (error) {
        return 'Error while looking for highest product price!';
    }
};

export const findLowestPriceProduct = (products) => {
    try {
        let highestPrice = findHighestPriceProduct(products);
        products.forEach((product) =>
            {
                product.price < highestPrice ? highestPrice = product.price : highestPrice;
            }
        );
        return highestPrice;
    } catch (error) {
        return 'Error while looking for lowest product price!';
    }
};


export const checkForAppliedFilters = (highToLowFlag : boolean, lowToHighFlag : boolean, products : any, minPriceRange : number, maxPriceRange : number) => {
    try {
        if(minPriceRange > maxPriceRange && minPriceRange > 0){products = filterProductsUsingPriceRange(products, minPriceRange, maxPriceRange);}
        if(lowToHighFlag) {products = filterProductsFromLowToHigh(products);}
        else if(highToLowFlag) {products = filterProductsFromHighToLow(products);}
        else{products = sortingProductsByRelevanceAPI(products);}
        return products;
    } catch (error) {
        return 'ERROR: CHECKING FOR APPLIED FILTERS FAILED';
    }
};
