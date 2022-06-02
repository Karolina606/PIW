import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { useEffect, useState, useContext } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import axios from 'axios';
import Layout from "./pages/Layout";
import Announcements from "./pages/Announcements";
import NoPage from "./pages/NoPage";
import AddForm from './pages/AddForm';
import MessageSender from "./pages/MessageSender";
import GroupAnnouncements from './pages/GroupAnnouncements';
import GroupAddForm from './pages/GroupAddForm';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import Student from './pages/Student';
import Cart from './pages/Cart';
import Loginv2 from './pages/Loginv2';
import { Link } from 'react-router-dom';
import AccountContext from './contexts/AccountContext';
import AllAccountsContext from './contexts/AllAccountsContext';
import { useReducer } from 'react';
import { reducer, initState, ReducerContext } from './contexts/ReducerContext';
import MyAdds from './pages/MyAdds';


// import {getAuth} from "firebase/auth"
// import { auth } from './firebase/init';
// import {useAuthState} from "react-firebase-hooks/auth"
// import {logout} from "./firebase/users"
import { getAllAdds, setAdds } from './firebase/adds';

function App() {
    const [adds, setAdds] = useState({});
    const [groupAdds, setGroupAdds] = useState({});
    const [accounts, setAccounts] = useContext(AllAccountsContext);
    // const [loudedAccounts, setLouded] = useState({});

    const [state, dispatcher] = useReducer(reducer, initState);
    
    // const [userInny] = useAuthState(auth);

    useEffect(() => {
        axios.get("http://localhost:3000/PIW/lab3/studentsAdds.json")
            .then(res => {
                
                let allStudents = res.data;
                
                for (let i = 0; i < allStudents.all.length; i++){
                    axios.get("https://dog.ceo/api/breeds/image/random").then(responsePicture => {
                        const recievedPicture =  responsePicture.data.message;

                        // console.log({recievedPicture});
                        allStudents.all[i]["picture"] = recievedPicture;
                        allStudents.all_to_show[i]["picture"] = recievedPicture;
                        // console.log({allStudents});
                    });
                    
                }
                getAllAdds().then(
                    listOfAdds => {
                        allStudents.all = allStudents.all.concat(listOfAdds);
                        allStudents.all_to_show = allStudents.all_to_show.concat(listOfAdds);

                        console.log({listOfAdds});
                        console.log({allStudents});   
                    });

                setAdds(allStudents);
            });

        
        axios.get("http://localhost:3000/PIW/lab3/groupsAdds.json")
        .then(res => {
            setGroupAdds(res.data);
        });

        
        // axios.get("http://localhost:3000/PIW/lab3/accounts.json")
        //     .then(res => {
        //         const allAccounts = res.data.accounts;
        //         setLouded({"accounts":[...allAccounts]});
        //         console.log({allAccounts});
        //         setAccounts(allAccounts);
        //         console.log({loudedAccounts});
        //         console.log({accounts});
        //     }
        // );
    }, []);

    // useEffect(() => {
    //     axios.get("http://localhost:3000/PIW/lab3/accounts.json")
    //         .then(res => {
    //             const allAccounts = res.data.accounts;
    //             setLouded(allAccounts);
    //             console.log({allAccounts});
    //             setAccounts(loudedAccounts);
    //             console.log({loudedAccounts});
    //             console.log({accounts});
    //         }
    //     );
    // }, []);


    return ( <div className="App">
        <header>
            <h1 id="page-header">Samotny? Znajdź swoją grupę projektową!</h1>
        </header>
        <AccountContext.Provider value={useState("")}>
            <ReducerContext.Provider value={[state, dispatcher]}>
            {/* <AllAccountsContext.Provider value={useState(loudedAccounts)}> */}
                <main>
                
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route path="announcements" element={<Announcements announcementsState={adds} setAdds={setAdds}  />} />
                                <Route path="addForm" element={<AddForm announcementsState={adds} setAdds={setAdds} />} />
                                <Route path="sendMessage" element={<MessageSender />} />
                                <Route path="groupAnnouncements" element={<GroupAnnouncements groupAnnouncementsState={groupAdds} setGroupAdds={setGroupAdds} />} />
                                <Route path="groupAddForm" element={<GroupAddForm groupAdds={groupAdds} setGroupAdds={setGroupAdds}/>} />
                                <Route path="logIn" element={<LogIn />} />
                                <Route path="signIn" element={<SignIn />} />
                                <Route path="student" element={<Student />} />
                                <Route path="login_v2" element={<Loginv2 />} />
                                <Route path="my_adds" element={<MyAdds />} />
                                <Route path="*" element={<NoPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </main>
            {/* </AllAccountsContext.Provider> */}
            </ReducerContext.Provider>
        </AccountContext.Provider>
      </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;