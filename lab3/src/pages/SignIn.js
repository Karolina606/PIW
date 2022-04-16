import React, { useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllAccountsContext from "../contexts/AllAccountsContext";

const SignIn= (props) => {
    const [accounts, setAccounts] = useContext(AllAccountsContext);

    const [passes, setPasses] = useState({ 
        inputName:"",
        inputEmail:"",
        inputPassword:"",
    });
    
    const handleChange = (event) => {
        // event.preventDefault();

        const name = event.target.id;
        const value = event.target.value;
        // console.log({value});
        setPasses(pass => ({...passes, [name]: value}));
        // console.log({accounts});
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        if (passes.inputName !== "" &&
            passes.inputEmail !== "" &&
            passes.inputPassword !== ""){

            const name = passes.inputName;
            const email = passes.inputEmail;
            const password = passes.inputPassword;


            // axios.get("http://localhost:3000/PIW/lab3/accounts.json")
            // .then(res => {
            //     let allAccounts = res.data;
            // accounts.append();
            
            let allAccounts = [accounts];
            allAccounts.concat(allAccounts, {"name":{name}, "email":{email}, "password":{password}});
            setAccounts(allAccounts);

            console.log({accounts});
                // axios.post('http://localhost:3000/PIW/lab3/accounts.json', accounts)
                //     .then(response => console.log({response}));
            // });

            toast.success("Zostałeś zarejestrowany, możesz się teraz zalogować!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setPasses({ 
                inputName:"",
                inputEmail:"",
                inputPassword:"",
            });

        }else{
            toast.error('Musisz uzupełnić wszyskie pola, aby się zarejestrować!', {
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
            <h2 className="subpage-header">Zarejestruj się</h2>
            <form onSubmit={handleAddFormSubmit}>
                <div className="form-group">
                    <label for="inputName">Imię</label>
                    <input type="text" className="form-control" id="inputName" onChange={handleChange}
                    placeholder="Jan K." value={passes.inputName || ""}></input>
                </div>
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
                <button type="submit" className="btn btn-primary">Zarejestruj się</button>
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
  
export default SignIn;