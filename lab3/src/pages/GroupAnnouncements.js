import GroupAdd from "./GroupAdd";
import Filters from "./Filters";
import { NavLink } from "react-router-dom";
import React from 'react';
// import ReactDOM from 'react-dom';

// const GroupAnnouncements = (props) => {
//     const groupAdds = props.gropuAnnouncementsState;
//     const setGroupAdds = props.setGroupAdds;

//     return <>
//         <h2>Ogłoszenia grup</h2>
//         <Filters announcementsState={groupAdds} setAdds={setGroupAdds}/>

//         <div id="announcments">
//             {groupAdds.all_to_show.map(add => (  
//                 <NavLink to="/sendMessage">
//                     <Add add_class_name={add.add_class_name} 
//                     add_students_names={add.add_students_names}
//                     add_description={add.add_description}
//                     add_tags={add.add_tags}
//                     />
//                 </NavLink>
//             ))} 
//         </div>
//     </> 
//   };
  


class GroupAnnouncements extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return <>
            <h2 class="subpage-header">Ogłoszenia grup</h2>
            <Filters announcementsState={this.props.groupAnnouncementsState} setAdds={this.props.setGroupAdds}/>

            <div id="announcments">
                {this.props.groupAnnouncementsState.all_to_show.map(add => (  
                    <NavLink to="/sendMessage">
                        <GroupAdd add_class_name={add.add_class_name} 
                        add_students={add.add_students}
                        add_description={add.add_description}
                        add_tags={add.add_tags}
                        />
                    </NavLink>
                ))} 
            </div>
        </> 
    }
}
  
// ReactDOM.render(<GroupAnnouncements />, document.getElementById('root'));
export default GroupAnnouncements;