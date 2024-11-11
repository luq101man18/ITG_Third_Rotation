const fetchProductsData = async (limit : number, skip : number) => {
    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        let dataFetched = await response.json();
        if(dataFetched){
            return dataFetched;
        }
    } catch (error) {
        return 'Error at fetching the data!';
    }
};

export default fetchProductsData;
