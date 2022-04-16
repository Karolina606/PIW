import { useContext} from "react";
import { Link } from "react-router-dom";
import { ReducerContext } from "../contexts/ReducerContext";
import { NavLink } from "react-router-dom";
import Add from "./Add";
import GroupAdd from "./GroupAdd";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = (props) => {
    const [followState] = useContext(ReducerContext);
    let singleAdds = [];
    let groupAdds = [];

    for (const add of followState.observed){
        if ('add_student_name' in add){
            // const to_add = add.add;
            singleAdds = [...singleAdds, {add}];
            console.log(add);
            console.log({singleAdds});
        }else if('add_students' in add){
            groupAdds = [...groupAdds, {add}];
            console.log({groupAdds});
        }
    }


    return <>
    <h2 className="subpage-header">Obserwowane</h2>

    <div id="announcments">
        {singleAdds.map((add, i) => ( 
            // <NavLink to="/sendMessage">
                <Add key={i} add_class_name={add.add.add_class_name.add_class_name} 
                add_student_name={add.add.add_student_name.add_student_name}
                add_description={add.add.add_description.add_description}
                add_tags={add.add.add_tags.add_tags}
                picture={add.add.picture.picture}
                if_in_cart={true}
                />
            // </NavLink>
        ))} 
    </div>


    <div id="groupAnnouncments">
        {groupAdds.map((add, i) => (  
            // <NavLink to="/sendMessage">
                <GroupAdd key={i} add_class_name={add.add.add_class_name.add_class_name} 
                add_students={add.add.add_students.add_students}
                add_description={add.add.add_description.add_description}
                add_tags={add.add.add_tags.add_tags}
                if_in_cart={true}
                />
            // </NavLink>
        ))} 
    </div>
</>    
};

export default Cart;