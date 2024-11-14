export const fetchProductById = async (productId:number) => {
    try {
        const response = await fetch('https://dummyjson.com/products/' + productId);
        if(response){
            let dataFetched = await response.json();
            return dataFetched;
        }
    } catch (error) {
        return 'Error at fetching the data!';
    }
};
