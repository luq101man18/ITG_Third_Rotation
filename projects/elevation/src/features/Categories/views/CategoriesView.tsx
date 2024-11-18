import react, { useReducer } from 'react';
import { View, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';
import { fetchAllCategoriesUsingAPI, fetchAllProductsForSpecificCategoryUsingAPI } from '../server/api';
import { useEffect, useState } from 'react';
import { styles } from '../styles';
export default function CategoriesView({setProducts}) {

    const [fetchedCategories, setCategories] = useState([]);

    const fetchAllCategories = async () => {
        const response = await fetchAllCategoriesUsingAPI();
        if(response){
            setCategories(response);
        }
    };

    const fetchAllProductsForSpecificCategory = async (item : string) => {
        const response = await fetchAllProductsForSpecificCategoryUsingAPI(item);
        if (response.total > 0) {
            setProducts(response.products);
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, []);

    return(
        <View style={styles.categoryContainer}>
            <FlatList
                horizontal={true}
                style={{}}
                data={fetchedCategories}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => fetchAllProductsForSpecificCategory(item)}>
                            <View style={styles.categoryButton}>
                                <Text style={styles.categoryButtonText}>{item}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );

}
