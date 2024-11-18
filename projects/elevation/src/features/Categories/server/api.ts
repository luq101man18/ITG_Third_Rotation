export const fetchAllCategoriesUsingAPI = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        let dataFetched = await response.json();
        if(dataFetched){
            return dataFetched;
        }
    } catch (error) {
        return 'Error at fetching the data!';
    }
};
export const fetchAllProductsForSpecificCategoryUsingAPI = async (category : string) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}`);
        let dataFetched = await response.json();
        if(dataFetched){
            return dataFetched;
        }
    } catch (error) {
        return 'Error at fetching the data!';
    }
};
