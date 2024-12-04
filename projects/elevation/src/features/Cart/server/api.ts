const fetchProductViaId = async (productId : number) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        let dataFetched = await response.json();
        if(dataFetched){
            return dataFetched;
        }
    } catch (error) {
        return `Error at fetching the product number ${productId} in cart!`;
    }
};

export default fetchProductViaId;
