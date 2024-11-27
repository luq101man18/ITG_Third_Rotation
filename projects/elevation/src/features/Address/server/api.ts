import reactotron from "reactotron-react-native";

export interface Address {
    'address' ?: string,
    'city' ?: string,
    'state' ?: string,
    'stateCode' ?: string,
    'postalCode' ?: string,
    'coordinates' ?: {
        'lat' ?: number,
        'lng' ?: number,
    },
    'country' ?: string
}
export const fetchAddressesById = async (userId:number) => {
    try {
        const emptyAddressObj : Address =  {
            'address' : '',
            'city' : '',
            'state' : '',
            'stateCode' : '',
            'postalCode' : '',
            'coordinates' : {
                'lat' : 0,
                'lng' : 0,
            },
            'country' : '',
        };
        const response = await fetch(`https://dummyjson.com/users/1`);
        if(response){
            let dataFetched = await response.json();
            const { address } = dataFetched;
            const addressFromApi : Address = address ?? emptyAddressObj;
            return addressFromApi;
        }
    } catch (error) {
        return `Error at fetching the address for ${userId}!`;
    }
};
