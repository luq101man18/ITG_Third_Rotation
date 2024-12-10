import reactotron from "reactotron-react-native";

export interface Card {
    'cardExpire' ?: string,
    'cardNumber' ?: string,
    'cardType' ?: string,
    'currency' ?: string,
    'iban' ?: string,
}
export const fetchCardsById = async (userId:number) => {
    try {
        const emptyCardObj : Card =  {
            'cardExpire' : '',
            'cardNumber' : '',
            'cardType' : '',
            'currency' : '',
            'iban' : '',
        };
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        if(response){
            let dataFetched = await response.json();
            const { bank } = dataFetched;
            const cardFromApi : Card = bank ?? emptyCardObj;
            return cardFromApi;
        }
    } catch (error) {
        return `Error at fetching the card for ${userId}!`;
    }
};
