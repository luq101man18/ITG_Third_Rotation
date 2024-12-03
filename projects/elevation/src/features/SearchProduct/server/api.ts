const fetchProductsData = async (productName : string) => {
    try {
        const response = await fetch('https://dummyjson.com/products/search?q=' + productName);
        let dataFetched = await response.json();
        if(dataFetched){
            return dataFetched.products;
        }
    } catch (error) {
        return 'Error at fetching the data!';
    }
};
export default fetchProductsData;
