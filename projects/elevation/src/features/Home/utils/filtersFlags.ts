import reactotron from "reactotron-react-native";
import { filterProductsFromHighToLow, filterProductsFromLowToHigh, filterProductsUsingPriceRange, sortingProductsByRelevanceAPI } from "../server/filters/filtersApi";

const applySortingByRelevance = (products : any) =>{
    return sortingProductsByRelevanceAPI(products);
};
const applySortingFromHighToLow = (products: any) =>{
    return filterProductsFromHighToLow(products);
};
const applySortingFromLowToHigh = (products : any) =>{
    return filterProductsFromLowToHigh(products);
};

const applyPriceRange = (products : any, minPriceRangeApplied : number, maxPriceRangeApplied : number) =>{
    return filterProductsUsingPriceRange(products, minPriceRangeApplied, maxPriceRangeApplied);
};

export const checkForAppliedFilters = (sortingFromHighToLow: boolean, sortingFromLowToHigh: boolean, products : any[], minPriceRangeApplied : number, maxPriceRangeApplied : number) =>{
    let filteredProducts = products;
    if(minPriceRangeApplied > 0 && maxPriceRangeApplied > 0) { filteredProducts = applyPriceRange(products, minPriceRangeApplied, maxPriceRangeApplied); }
    if(sortingFromLowToHigh && !sortingFromHighToLow) {return applySortingFromLowToHigh(filteredProducts);}
    else if(sortingFromHighToLow && !sortingFromLowToHigh) {return applySortingFromHighToLow(filteredProducts);}
    else{
        return applySortingByRelevance(filteredProducts);
    }
};




