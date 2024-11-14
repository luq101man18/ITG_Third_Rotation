const fetchProductsData = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        let dataFetched = await response.json();
        if(dataFetched){
            return dataFetched;
        }
    } catch (error) {
        return 'Error at fetching the data!';
    }
};
export default fetchProductsData;
