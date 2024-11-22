const fetchProductsData = async (limit : number = 10) => {
    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=0`);
        let dataFetched = await response.json();
        if(dataFetched){
            return dataFetched.products;
        }
    } catch (error) {
        return 'Error at fetching the data From API!';
    }
};

export default fetchProductsData;
