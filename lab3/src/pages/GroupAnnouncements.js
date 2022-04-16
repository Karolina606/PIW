import GroupAdd from "./GroupAdd";
import Filters from "./Filters";
import { NavLink } from "react-router-dom";
import React from 'react';

class GroupAnnouncements extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return <>
            <h2 className="subpage-header">Ogłoszenia grup</h2>
            <Filters announcementsState={this.props.groupAnnouncementsState} setAdds={this.props.setGroupAdds}/>

            <div id="announcments">
                {this.props.groupAnnouncementsState.all_to_show?.map(add => (  
                    // <NavLink to="/sendMessage">
                        <GroupAdd add_class_name={add.add_class_name} 
                        add_students={add.add_students}
                        add_description={add.add_description}
                        add_tags={add.add_tags}
                        if_in_cart={false}
                        />
                    // </NavLink>
                ))} 
            </div>
        </> 
    }
}
  
// ReactDOM.render(<GroupAnnouncements />, document.getElementById('root'));
export default GroupAnnouncements;