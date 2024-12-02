import React from "react";


const searchProducts = async (product : string) => {
    try {
        const response = await fetch('https://dummyjson.com/products/search?limit=5&q=' + product);
        let dataFetched = await response.json();
        if(dataFetched){
            return dataFetched;
        }
    } catch (error) {
        return 'Error at fetching the data!';
    }
};






export default searchProducts;
