//create login function
export const logi = async(email, password, dispatch) => {

    const options = {
        method: 'POST',
        headers: {
            "Content-type": 'application/json',
        },
        body: JSON.stringify({
            email: email,
            passwrod: password,
        })
    }
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/token`, options);

    //handle any none 200 codes 
    if (!response.ok) {
            const data = await response.json();
            console.log(data.msg);
            return {
                error: {
                    status: response.status,
                    statusText: response.statusText,
                }
            }
    }
    //if response ok 200
    const data = await response.json();
    console.log(data.access_token)
    //add sessonStorage
    //add dispatch
    return data;
}