export interface UserDetails {
    fullName: string,
    email: string,
    phoneNumber: string,
    DOB: string,
    userGender: string,
}

const fetchUserViaId = async (userId : number) => {
    try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        let dataFetched = await response.json();
        if(dataFetched){
            return dataFetched;
        }
    } catch (error) {
        return `Error at fetching the user: ${userId} in account!`;
    }
};

export default fetchUserViaId;
