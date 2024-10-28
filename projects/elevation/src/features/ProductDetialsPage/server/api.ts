


const fetchProductByName = async (productId:number) => {
    try {
        const response = await fetch('https://dummyjson.com/products/' + productId);
        //let dataFetched = await response;
        if(response){
            return response;
        }
    } catch (error) {
        return 'Error at fetching the data!';
    }
};

export default fetchProductByName;
