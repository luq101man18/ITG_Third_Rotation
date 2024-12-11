export function formatCreditCardNumber(creditCardNumber:string) {
    let fourDigitsArray = [];
    for (let index = 0; index < creditCardNumber.length; index++) {
        if(index === 3 || index === 7 || index === 11){
            const fourDigits = creditCardNumber.substring(0,3);
            fourDigitsArray.push(fourDigits);
        }
    }
    return fourDigitsArray;
}
