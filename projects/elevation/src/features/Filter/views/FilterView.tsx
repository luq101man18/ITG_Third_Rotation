import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import RangeSlider from 'react-native-range-slider'
import DropDownPicker from 'react-native-dropdown-picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { styles } from '../styles';
const FilterView = () => {
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


    // range slider

    const [sliderValue, setSliderValue] = useState([0, 19]);
    const handleChange = (value) => {
        setSliderValue(value);
    };

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);

    return (
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={['60%']}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <ScrollView>
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 10, }}>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 25, marginBottom: 10,}}>Filters</Text>
                                <View style={{marginLeft: 240}}>
                                    <IconButton
                                        icon={'close'}
                                        iconColor="black"
                                        size={35}
                                        onPress={() => { bottomSheetRef.current?.close(); }}
                                    />
                                </View>
                            </View>
                            <View style={{height: 1, width: '100%', backgroundColor: 'E6E6E6'}} />
                            <View>
                                <View>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginBottom: 10, }}>Sort by</Text>
                                </View>
                                <View>
                                    <ScrollView
                                    >
                                        <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
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
                            <View style={{ height: 1, width: '100%', backgroundColor: '#E6E6E6' }} />
                            <View style={{ marginTop: 20 }}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Price</Text>
                                    <Text style={{marginLeft: 230, fontSize: 18}}>$ 0 - $ 19</Text>
                                </View>
                                <View style={{marginHorizontal: 8}}>
                                    <View>
                                        <MultiSlider
                                            onValuesChange={handleChange}
                                            max={19}
                                            min={0}
                                            sliderLength={300}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 1, width: '100%', backgroundColor: '#E6E6E6' }} />
                            <View style={{flexDirection: 'row', marginTop: 20}}>
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
                            </View>
                            <View>
                                <TouchableOpacity style={styles.applyFilterButton} onPress={() => bottomSheetRef.current?.close()}>
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