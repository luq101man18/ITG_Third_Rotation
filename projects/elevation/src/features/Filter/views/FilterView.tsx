import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import RangeSlider from 'react-native-range-slider'
import DropDownPicker from 'react-native-dropdown-picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { styles } from '../styles';
import { Alert } from 'react-native';
import { filterProductsFromHighToLow, filterProductsFromLowToHigh, filterProductsUsingPriceRange, sortingProductsByRelevanceAPI } from '../server/api';
import reactotron from 'reactotron-react-native';
import { findHighestPriceProduct, findLowestPriceProduct } from '../server/api';
import { useAppSelector } from '../../../hooks/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FilterView = ({products, setProducts, displayFilter}) => {

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // sorting buttons states
    const [relevance, setRelevance] = useState(true);
    const [highToLow, setHighToLow] = useState(false);
    const [lowToHigh, setLowToHigh] = useState(false);

    //DropDownSize
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'S', value: 'Small' },
        { label: 'M', value: 'Medium' },
        { label: 'L', value: 'Large' },
    ]);



    let savedPriceRangeValues: any = [];
    const savePriceRangeValues = async (value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('price-range-values', jsonValue);
        } catch (e) {
            return 'PriceRangeValues were not saved';
        }
    };

    const getPriceRangeValues = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('price-range-values');

            if (jsonValue != null) {
                let priceRangeValues = JSON.parse(jsonValue);
                return priceRangeValues;
            } else {
                return null;
            }
        } catch (e) {
            return 'PriceRangeValues were not received from Async storage';
        }
    };

    // get products from slice
    const productsFromSlice = useAppSelector((state: RootState) => state.products.products);
    let filteredProducts : any[] = products;

    const filterProductsHighToLow = (products) => {
        try {
            filteredProducts = filterProductsFromHighToLow(filteredProducts);
        } catch (error) {
            Alert.alert('An error occurred while filtering products.');
        }
    };

    const filterProductsLowToHigh = (products) => {
        try {
            filteredProducts = filterProductsFromLowToHigh(filteredProducts);
        } catch (error) {
            Alert.alert('An error occurred while filtering products.');
        }
    };

    const filterProductsBasedOnPriceRange = (products, minPriceRange, maxPriceRange) => {
        try {
            filteredProducts = filterProductsUsingPriceRange(products, minPriceRange, maxPriceRange);
        } catch (error) {
            Alert.alert('An error occurred while filtering products.');
        }
    };

    const lookForHighestProductsPrice = () => findHighestPriceProduct(productsFromSlice);
    const lookForLowestProductsPrice = () => findLowestPriceProduct(productsFromSlice);

    const [sliderValue, setSliderValue] = useState(
        [lookForLowestProductsPrice(), lookForHighestProductsPrice()]
    );

    const handleChange = (rangeSlideValue: any) => {
        setSliderValue(rangeSlideValue);
        savePriceRangeValues(rangeSlideValue);
    };

    const setPriceRange = async () => {
        savedPriceRangeValues = await getPriceRangeValues();
        if (savedPriceRangeValues) {
            if (savedPriceRangeValues) {
                setSliderValue([savedPriceRangeValues[0] ? savedPriceRangeValues[0] : lookForLowestProductsPrice(),
                savedPriceRangeValues[1] ? savedPriceRangeValues[1] : lookForHighestProductsPrice()
                ]);
            }
        }
    };

    const sortingProductsByRelevance = () => {
        try {
            filteredProducts = sortingProductsByRelevanceAPI(filteredProducts);
        } catch (error) {
            Alert.alert('An error occurred while filtering products.');
        }
    };

    function sortProductsBasedOnChosenSortOption(){
        // check states
        if(relevance){
            // TODO:
                // take searched input and filter items based on that on the search screen
            sortingProductsByRelevance();
        } else if (highToLow) {
            filterProductsHighToLow(filteredProducts);
        }
        else if (lowToHigh) {
            filterProductsLowToHigh(filteredProducts);
        }
    }

    function processProductsFiltration(){
        filterProductsBasedOnPriceRange(productsFromSlice, sliderValue[0], sliderValue[1]);
        sortProductsBasedOnChosenSortOption();
        setProducts(filteredProducts);
        displayFilter();
    }

    useEffect(() => {
        setPriceRange();
    }, []);

    return (
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={['60%']}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <ScrollView>
                        <View>
                            <View style={styles.filterHeader}>
                                <Text style={styles.filterHeaderTitle}>Filters</Text>
                                <View style={styles.filterHeaderIcon}>
                                    <IconButton
                                        icon={'close'}
                                        iconColor="black"
                                        size={35}
                                        onPress={() => {
                                            displayFilter();
                                            bottomSheetRef.current?.close();
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={styles.filterLineSeparator} />
                            <View>
                                <View>
                                    <Text style={styles.filterSortByHeader}>Sort by</Text>
                                </View>
                                <View>
                                    <ScrollView
                                    horizontal={true}
                                    >
                                        <View style={styles.filterButtonsContainer}>
                                            <View>
                                                <TouchableOpacity style={[styles.filterSheetButton, { backgroundColor: relevance ? 'black' : 'white'}]} 
                                                    onPress={() => {
                                                        setRelevance(true);
                                                        setHighToLow(false);
                                                        setLowToHigh(false);
                                                    }}>
                                                    <Text style={[styles.filterSheetButtonText, { color : relevance ? 'white' : 'black' }]}>Relevance</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <TouchableOpacity style={[styles.filterSheetButton, { backgroundColor: highToLow ? 'black' : 'white' }]}
                                                    onPress={() => {
                                                        setHighToLow(true);
                                                        setLowToHigh(false);
                                                        setRelevance(false);
                                                    }}>
                                                    <Text style={[styles.filterSheetButtonText, { color: highToLow ? 'white' : 'black' }]}>Price: High - Low</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <TouchableOpacity style={[styles.filterSheetButton, { backgroundColor: lowToHigh ? 'black' : 'white' }]}
                                                    onPress={() => {
                                                        setLowToHigh(true);
                                                        setHighToLow(false);
                                                        setRelevance(false);
                                                    }}>
                                                    <Text style={[styles.filterSheetButtonText, { color: lowToHigh ? 'white' : 'black' }]}>Price: Low - High</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                            <View style={styles.filterLineSeparator} />
                        <View style={styles.filterRangeSliderContainer}>
                                <View style={styles.filterPriceRangeSliderHeaderContainer}>
                                    <Text style={styles.filterPriceRangeSliderHeaderText}>Price</Text>
                                    <Text style={styles.filterPriceRangeSliderPricesText}>$ {lookForLowestProductsPrice()} - $ {lookForHighestProductsPrice()}</Text>
                                </View>
                                <View style={styles.filterPriceRangeSlider}>
                                    <View>
                                        <MultiSlider
                                            onValuesChange={handleChange}
                                            values={sliderValue}
                                            sliderLength={290}
                                            min={lookForLowestProductsPrice()}
                                            max={lookForHighestProductsPrice()}
                                            step={1}
                                            allowOverlap={false}
                                            enableLabel
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.filterLineSeparator} />
                            {/* <View style={{flexDirection: 'row', marginTop: 20}}>
                                <View>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Size</Text>
                                </View>
                                <View style={{width: 70, height: 40, marginLeft: 240}}>
                                    <DropDownPicker
                                        open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        placeholder="ex:L"
                                    />
                                </View>
                            </View> */}
                            <View>
                            <TouchableOpacity style={styles.applyFilterButton} onPress={() => processProductsFiltration()}>
                                    <Text style={styles.applyFilterButtonText}>Apply Filter</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </BottomSheetView>
            </BottomSheet>
    );
};


export default FilterView;
