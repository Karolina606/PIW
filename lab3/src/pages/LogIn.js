import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AccountContext from "../contexts/AccountContext";
import AllAccountsContext from "../contexts/AllAccountsContext";
import { useNavigate, Link } from "react-router-dom"
import useLocalStorage from "../useLocalStorage";

import { auth } from "../firebase/init.js";
import { logInWithGoogle, logInWithGithub, logInWithEmailAndPassword } from "../firebase/users";
import { useAuthState } from "react-firebase-hooks/auth";



const LogIn= (props) => {
    const [account, setAccount] = useContext(AccountContext);
    const [accounts, setAccounts] = useContext(AllAccountsContext);
    const navigate = useNavigate();
    const [accountLS, setAccountLS] = useLocalStorage(["account"], ["account"]);

    const [passes, setPasses] = useState({ 
        inputEmail:"",
        inputPassword:"",
    });
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading)
            return
        if (user)
            navigate("/");
        if(error)
            console.error({error});
        }, [user, loading]);


    const handleChange = (event) => {
        event.preventDefault();

        const name = event.target.id;
        const value = event.target.value;
        console.log({value});
        setPasses(pass => ({...passes, [name]: value}));
    }

    const handleLogInFormSubmit = (event) => {
        event.preventDefault();

        if (passes.inputEmail !== "" &&
            passes.inputPassword !== ""){            

            axios.get("http://localhost:3000/PIW/lab3/accounts.json")
            .then(res => {
                let allAccounts = res.data;
                
                for (let i = 0; i < allAccounts.accounts.length; i++){
                    if(allAccounts.accounts[i]["email"] === passes.inputEmail && allAccounts.accounts[i]["password"] === passes.inputPassword){
                        setAccount(allAccounts.accounts[i]);
                        setAccountLS(allAccounts.accounts[i]);

                        toast.success("Zostałeś zalogowany", {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
            
                        setPasses({ 
                            inputEmail:"",
                            inputPassword:"",
                        });

                        navigate("/announcements");
                        console.log({account});
                    }
                }
            });
        }else{
            toast.error('Musisz uzupełnić wszyskie pola poprawnie, aby się zalogować!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        
    }

    return <>
        <div className="forms">
            <h2 className="subpage-header">Zaloguj się</h2>
            <form onSubmit={handleLogInFormSubmit}>
                <div className="form-group">
                    <label for="inputEmail">Email</label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={handleChange}
                    placeholder="Email" value={passes.inputEmail || ""}></input>
                </div>
                <div className="form-group">
                    <label for="inputPassword">Hasło</label>
                    <input type="password" className="form-control" id="inputPassword" rows="3" onChange={handleChange}
                    placeholder="Hasło" value={passes.inputPassword || ""}></input>
                </div>
                <button type="submit" className="btn btn-primary">Zaloguj się</button>
                
                <button className="btn btn-secondary"
                    onClick={() => logInWithEmailAndPassword(passes.inputEmail, passes.inputPassword)}
                >
                    Login
                </button>
                <button onClick={logInWithGoogle} className="btn btn-secondary btn-google">
                    Login with Google
                </button>
                <button onClick={logInWithGithub} className="btn btn-secondary btn-github">
                    Login with Github
                </button>
                <br/>
                <div>
                    Don't have an account? <Link to="/signIn">Register</Link> now.
                </div>
            </form>

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    </>
};
  
export default LogIn;