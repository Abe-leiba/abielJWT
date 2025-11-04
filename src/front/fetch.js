//create login function
export const login = async(email, password, dispatch) => {

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
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
    
    sessionStorage.setItem('token', data.access_token);
    dispatch({
        type: 'fetchedToken',
        payload: {
            token:data.access_token,
            isLoginSuccessful: true,
        
        }    
    })
    return data;
}


export const signup = async(email, password, dispatch) => {

const options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, options);

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

    
       
        //if the response is type 200
        const data = await response.json();
        console.log = await(data.message);
        dispatch({
            type: 'successfulSignUp',
            payload: {
                    'message': data.message,
                    'isSignupSuccessful': true,
            }
        })
        return data;

}