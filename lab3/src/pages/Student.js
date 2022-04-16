import {useLocation} from "react-router-dom";

const Student = () => {
    const location = useLocation();
    const state = location.state;
    console.log({state});

    return <div className="student-class row">
                <div className="add-text-info col">
                    <h1 className="add-student-name"> {state.student_name.add_student_name} </h1>
                </div>
                <img className="student-photo col col-lg-2" src={state.picture.picture} alt="student_photo" />

            </div>    
};

export default Student;