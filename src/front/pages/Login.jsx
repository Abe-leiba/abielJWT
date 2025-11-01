










import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

e


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {store, dispatch} = useGlobalReducer();

    const handleLoginClick = () => {
        Login(email, password, dispatch)
    }


    return (
        <>
        <div className="login-page">
        {
            //ternary
            //check store for valid token,if there is welcome user, else direct to login.
            (store.token && store.token !== undefined && store.token !== "")
            ?
            <>
                <h1>Hello! you are logged in.</h1>
                <div>{store.token}</div>
                </>

                <>
                
                    <h1>Login</h1>
                    <div>
                        <input
                             type="text"
                             placeholder="Enter Email"
                             value={password}
                             onChange={e => setEmail(e.target.value)}
                             />
                            </div>
                    <div>
                        <input
                             type="text"
                             placeholder="Enter Password"
                             value={password}
                             onChange={e => setPassword(e.target.value)}
                             />
            </div>
        <div>
            <button>Login

            </button
                onClick=(handleLoginClick}
        </div>
         />
    );
}