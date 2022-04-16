import { initState, reducer, ReducerContext } from "../contexts/ReducerContext";
import { useReducer } from 'react';
import useLocalStorage from "../useLocalStorage";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GroupAdd = (props) => {
    const add_students = props.add_students;
    const add_class_name = props.add_class_name;
    const add_description = props.add_description;
    const add_tags = props.add_tags;
    const [accountLS, setAccountLS] = useLocalStorage(["account"], ["account"]);
    let followButton;

    const [state, dispatcher] = useReducer(reducer, initState);

    if(accountLS[0] !== "account" && props.if_in_cart === false){
        followButton = <div className="col col-lg-2">
            <button className="follow-button follow-button-group" onClick={()=> {dispatcher({type: "follow", 
            payload: {
                "add_students": {add_students}, 
                "add_class_name": {add_class_name},
                "add_description": {add_description},
                "add_tags": {add_tags},
            }})

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
        }>Obserwuj</button>
        </div>
    } else if(accountLS[0] !== "account" && props.if_in_cart === true){
        followButton = <div className="col col-lg-2">
            <button className="follow-button follow-button-group" onClick={()=> {dispatcher({type: "unfollow", 
            payload: {
                "add_students": {add_students}, 
                "add_class_name": {add_class_name},
                "add_description": {add_description},
                "add_tags": {add_tags},
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
        }>Przestań obserwować</button>
        </div>
    }

    return <div className="add-class row"> 
        <h2 className="add-class-name" > {props.add_class_name} </h2>

        <div className="group-add-crew">
            <h4>Aktualny skład grupy:</h4>
            {props.add_students.map(student => (  
                <h6 className="add-student-name"> {student.name}</h6>
            ))} 
        </div>
        
        <div className="add-text-info col">
            <p className ="add-descritpion" > {props.add_description} </p>
            <div className="add-tag-list">
                <b>Tagi: </b> {props.add_tags}
            </div>
        </div>

        {followButton}

        <div className="col col-lg-2">
            <NavLink to="/sendMessage"> 
                <button className="follow-button follow-button-group" >
                    Napisz wiadomość
                </button>
            </NavLink>
        </div>
    </div>
    
};

export default GroupAdd;