import { useContext, useEffect, useState} from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import AccountContext from "../contexts/AccountContext";
import { ToastContainer, toast } from 'react-toastify';
import useLocalStorage from "../useLocalStorage";

import {getAuth} from "firebase/auth"
import { auth } from '../firebase/init';
import {useAuthState} from "react-firebase-hooks/auth"
import {logout} from "../firebase/users"

const Layout = () => {
    const [account, setAccount] = useContext(AccountContext);
    const [accountLS, setAccountLS] = useLocalStorage(["account"], ["account"]);
    let accountButtons;
    const navigate = useNavigate();

    const [userInny] = useAuthState(auth);

    const handleLogOutClick = (event) => {
        setAccount("");
        setAccountLS(["account"]);

        toast.success("Zostałeś wylogowany", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        navigate("/announcements");
    }
    
    if( account === "" && accountLS[0] === "account" && userInny){
        accountButtons = <>
            <li className="nav-item">
                <Link to="/my_adds">Moje ogłoszenia</Link>
            </li> 

             <li className="log-in-nav-button nav-item">
                <button onClick={logout}> Log Out with provider {userInny.displayName}</button>
            </li> 
 
        </>
    }else if( account === "" && accountLS[0] === "account" ){
        accountButtons = <>
            {userInny
            && <li className="nav-item">
                <Link to="/my_adds">Moje ogłoszenia</Link>
            </li> }

            <li className="log-in-nav-button nav-item">
                <Link to="/logIn">Zaloguj się</Link>
            </li>
            <li className="sign-in-nav-button nav-item">
                <Link to="/signIn">Zarejestruj się</Link>
            </li>

            {userInny
            && <li className="log-in-nav-button nav-item">
                <button onClick={logout}> Log Out with provider {userInny.displayName}</button>
            </li> }
 
        </>
    } else{
        accountButtons = <>
            <li className="nav-item">
                    <Link to="/yourCart">Koszyk obserwowanych</Link>
                </li>
            <li className="log-in-nav-button nav-item">
                <button onClick={handleLogOutClick}>Wyloguj się {accountLS.name}</button>
            </li>
        </>
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                {/* <div class="collapse navbar-collapse" id="navbarNav"> */}
                <ul>
                        {/* <div class="col"> */}
                            <li className="nav-item">
                                <Link to="/announcements">Ogłoszenia par</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/addForm">Dodaj ogłoszenie pary</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/groupAnnouncements">Ogłoszenia grup</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/groupAddForm">Dodaj ogłoszenie grupy</Link>
                            </li>
                        {/* </div> */}


                    {accountButtons}
                </ul>
            </nav>

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

            <Outlet />
        </>
  )
};

export default Layout;