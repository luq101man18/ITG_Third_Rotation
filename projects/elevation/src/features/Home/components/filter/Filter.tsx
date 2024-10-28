import React from "react";
import { View, Text, Animated } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef } from "react";


const Filter = () => {

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);


    return(
        <Animated.View>
            <BottomSheet
                ref={bottomSheetRef}
            >
                <BottomSheetView>
                    <Text>Bottom Sheet</Text>
                </BottomSheetView>
            </BottomSheet>
        </Animated.View>
    );
};

export default Filter;
