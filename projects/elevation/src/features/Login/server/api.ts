const fetchUserCredentialData = async (email : string, password : string) => {
    try {
        const response = await fetch('https://dummyjson.com/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'emilys', // change to accept username
                password: 'emilyspass', //change back to password
                expiresInMins: 30, // optional, defaults to 60
            }),
        });
        let dataFetched = await response.json();
        if(dataFetched){
            return dataFetched;
        }
    } catch (error) {
        return 'Error at fetching the data!';
    }
};

export default fetchUserCredentialData;
