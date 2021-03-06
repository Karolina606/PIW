import { Link, NavLink } from "react-router-dom";
import useLocalStorage from "../useLocalStorage";
import { initState, reducer, ReducerContext } from "../contexts/ReducerContext";
import { useReducer } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getAuth} from "firebase/auth"
import { auth } from '../firebase/init.js';
import {useAuthState} from "react-firebase-hooks/auth"

const Add = (props) => {
    const add_id = props.add_id;
    const add_student_name = props.add_student_name;
    const add_class_name = props.add_class_name;
    const add_description = props.add_description;
    const add_tags = props.add_tags;
    const picture = props.picture;
    const [accountLS, setAccountLS] = useLocalStorage(["account"], ["account"]);
    let followButton;

    const [state, dispatcher] = useReducer(reducer, initState);
    const [userInny] = useAuthState(auth);

    // console.log({props});
    if(accountLS[0] !== "account" && props.if_in_cart === false){
        followButton = <>
            <button className="follow-button follow-button-single col col-lg-2" onClick={()=> { dispatcher({type: "follow", 
                payload: {
                    "add_student_name": {add_student_name}, 
                    "add_class_name": {add_class_name},
                    "add_description": {add_description},
                    "add_tags": {add_tags},
                    "picture":{picture}, 
                }})

                console.log({state});
                toast.success("Zaobserwowałeś ogłoszenie", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } 
            }> Obserwuj </button>
        </>

    }else if(accountLS[0] !== "account" && props.if_in_cart === true){
        followButton = <>
            <button className="follow-button follow-button-single col col-lg-2" onClick={()=> { dispatcher({type: "unfollow", 
                payload: {
                    "add_student_name": {add_student_name}, 
                    "add_class_name": {add_class_name},
                    "add_description": {add_description},
                    "add_tags": {add_tags},
                    "picture":{picture}, 
                }})

                toast.success("Przestałeś osbserwować ogłoszenie", {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });  
            } 
            }> Przestań obserwować </button>
        </>
    }


    console.log({userInny});
    // console.log({add_student_name});

    return <div className="add-class row">
                <div className="add-text-info col">
                    <h2 className="add-class-name" > {add_class_name} </h2>
                    <Link to={"/student"}
                        state={{
                            student_name:{add_student_name},
                            picture:{picture}
                        }}>
                            <h5 className="add-student-name"> {add_student_name} </h5>
                    </Link>
                    <p className ="add-description" > {add_description} </p>
                    <div className="add-tag-list">
                        <b>Tagi: </b> {add_tags}
                    </div>
                </div>
                    
                {followButton}
                
                <NavLink to="/sendMessage" className="col">
                    <button className="follow-button follow-button-single col-lg-2">
                        Napisz wiadomość
                    </button>
                </NavLink>

                <Link to={"/edit_add"} className="col"
                        state={{
                            add_id:{add_id},
                            add_student_name:{add_student_name},
                            add_class_name:{add_class_name},
                            add_description:{add_description},
                            add_tags:{add_tags},
                        }}>
                    {userInny && userInny.displayName === props.add_student_name &&
                    <button className="follow-button follow-button-single col-lg-2">
                        Edytuj
                    </button>}
                </Link>
                
                <img className="student-photo col col-lg-2" src={picture} alt="student_photo" />

            </div>    
};

export default Add;