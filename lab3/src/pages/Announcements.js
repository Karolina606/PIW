import Add from "./Add";
// import AddForm from "./AddForm";
import Filters from "./Filters";
// import {useState} from "react";
import { NavLink } from "react-router-dom";

const Announcements = (props) => {
    const adds = props.announcementsState;
    const setAdds = props.setAdds;

    return <>
        <h2 class="subpage-header">Ogłoszenia par</h2>
        <Filters announcementsState={adds} setAdds={setAdds}/>

        <div id="announcments">
            {adds.all_to_show.map(add => (  
                <NavLink to="/sendMessage">
                    <Add add_class_name={add.add_class_name} 
                    add_student_name={add.add_student_name}
                    add_description={add.add_description}
                    add_tags={add.add_tags}
                    />
                </NavLink>
            ))} 
        </div>
    </> 
  };
  
  export default Announcements;