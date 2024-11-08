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
    filterSheetButton: {
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: 'black',
        borderRadius: 10,
        borderColor: '#B3B3B3',
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
    applyFilterButton: {
        marginTop: 30,
        backgroundColor: 'black',
        borderRadius: 10,
        marginRight: 25,
    },
    applyFilterButtonText: {
        color: 'white',
        textAlign: 'center',
        padding: 20,
        borderRadius: 20,
        fontWeight: "bold",
    },
});
