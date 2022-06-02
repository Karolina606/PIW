import Add from "./Add";
// import AddForm from "./AddForm";
import Filters from "./Filters";
// import {useState} from "react";
import { NavLink } from "react-router-dom";
import { getAllUserAdds } from "../firebase/adds";
import { useState } from "react";
import {getAuth} from "firebase/auth"
import { auth } from '../firebase/init.js';
import {useAuthState} from "react-firebase-hooks/auth"

const MyAdds = (props) => {
    const [adds, setAdds] = useState({});
    const [userInny] = useAuthState(auth);


    console.log({userInny});
    getAllUserAdds(userInny).then(
        listOfAdds => {
        const newAdds = {
            all:listOfAdds,
            all_to_show:listOfAdds
        }
        
        console.log({newAdds});
        setAdds(newAdds);
    });

    return <>
        <h2 className="subpage-header">Moje ogłoszenia</h2>
        <Filters announcementsState={adds} setAdds={setAdds}/>

        <div id="announcments">
            {adds.all_to_show?.map(add => (  
                // <NavLink to="/sendMessage">
                    <Add add_class_name={add.add_class_name} 
                    add_student_name={add.add_student_name}
                    add_description={add.add_description}
                    add_tags={add.add_tags}
                    picture={add.picture}
                    if_in_cart={false}
                    />
                // </NavLink>
            ))} 
        </div>
    </> 
  };

  export default MyAdds;