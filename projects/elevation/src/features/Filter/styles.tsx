import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        padding: 30,
        alignItems: 'flex-start',
    },
    filterHeader: {
        flexDirection: 'row',
        marginTop: 10,
        right: 10,
    },
    filterHeaderTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
        left: 10,
    },
    filterHeaderIcon: {
        marginLeft: 238,
    },
    filterLineSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: 'E6E6E6',
    },
    filterSortByHeader: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    filterButtonsContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    filterSheetButton: {
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: 'black',
        borderRadius: 10,
        borderColor: 'black',
    },
    filterSheetButtonText: {
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        fontWeight: "bold",
        borderColor: '#B3B3B3',
    },
    filterRangeSliderContainer: {
        marginTop: 20,
    },
    filterPriceRangeSliderHeaderText: {
        color: 'black', fontWeight: 'bold', fontSize: 20
    },
    filterPriceRangeSliderHeaderContainer: {
        flexDirection: 'row',
    },
    filterPriceRangeSliderPricesText: {
        marginLeft: 180,
        fontSize: 15,
    },
    filterPriceRangeSlider: {
        marginTop: 30,
        marginHorizontal: 20,
        left: 5,
    },
    applyFilterButton: {
        marginTop: 30,
        backgroundColor: 'black',
        borderRadius: 10,
        marginRight: 30,
    },
    applyFilterButtonText: {
        color: 'white',
        textAlign: 'center',
        padding: 20,
        borderRadius: 20,
        fontWeight: "bold",
    },
});
