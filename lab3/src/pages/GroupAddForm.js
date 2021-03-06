import React from "react";
// import Add from "./Add";
// import ReactDOM from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewGroupAdd } from "../firebase/adds";


class GroupAddForm extends React.Component {
    // const this.props.setGroupAdds = props.this.props.setGroupAdds;
    // const this.props.groupAdds = props.announcementsState;

    constructor(props){
        super(props);
        this.state = {
            // students: [{inputName0: "", inputEmail0: ""}, ],
            inputName0:"",
            inputEmail0:"",
            inputClassName:"",
            textareaDescription:"",
            inputTags:"",
            numberOfStudents:[0],
        };
        
    this.handleChange = this.handleChange.bind(this);
    // this.handleAddFormSubmit = this.handleAddFormSubmit.bind(this);
    }

    
        
        // const [this.state, this.props.setInputs] = useState({ 
        //     inputName:"",
        //     inputEmail:"",
        //     inputClassName:"",
        //     textareaDescription:"",
        //     inputTags:"",
        // });
        
    handleChange = (event) => {
        // // event.preventDefault();

        const name = event.target.id;
        const value = event.target.value;
        const actual = this.state;

        this.setState({[name]: value});
        // this.state[name] = this.state[name] + value;
    }

    handleAddStudent = (event) =>{
        const top = this.state.numberOfStudents.pop();
        const next = top + 1;

        this.state.numberOfStudents.push(top);
        this.state.numberOfStudents.push(next);
       
        const name = "inputName" + next
        const email = "inputEmail" + next;
        this.setState({...this.state, [name]: "", [email]: ""});
        // this.state.students.concat( this.state.students, {inputName: "", inputEmail: ""} );
        this.forceUpdate();
    }

    handleAddFormSubmit = (event) => {
        event.preventDefault();

        if (this.state.inputName0 !== "" &&
            this.state.inputEmail0 !== "" &&
            this.state.inputClassName !== "" &&
            this.state.textareaDescription !== "" &&
            this.state.inputTags !== ""){
            
            let students = [];
            for (let i = 0; i < this.state.numberOfStudents.length; i++){
                const name = eval("this.state.inputName" + i);
                const email = eval("this.state.inputEmail" + i);
                console.log({name});
                students.push({name: [name], email: [email]});
            }
            
            // console.log({this.state});
            const newNewNode = {
                add_students: students,
                add_class_name: this.state.inputClassName,
                add_description: this.state.textareaDescription,
                add_tags: this.state.inputTags};

            addNewGroupAdd(this.props.userInny, newNewNode);
    

            this.props.setGroupAdds({all: this.props.groupAdds.all.concat([newNewNode]),
                all_to_show: this.props.groupAdds.all_to_show.concat([newNewNode])
            });
    
            this.setState({
                inputName0:"",
                inputEmail0:"",
                inputClassName:"",
                textareaDescription:"",
                inputTags:"",
                numberOfStudents:[0],
            });


            toast.success("Twoje og??oszenie zosta??o dodane", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }else{
            console.warn("Uzupe??nij wszyskie pola, adby doda?? og??oszenie!");
            
            toast.error('Musisz uzupe??ni?? wszyskie pola, aby doda?? og??oszenie!', {
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

    render (){
        return <>
            <div className="add-form">
                <h2 className="subpage-header">Dodaj og??oszenie swojej grupy</h2>
                <form onSubmit={this.handleAddFormSubmit}>
                    
                        {this.state.numberOfStudents.map(student => (  
                            <>
                            <div className="student-template">
                                <div className="form-group student-template-element">
                                    <label for="inputName">Imi??</label>
                                    <input type="text" className="form-control" id={"inputName" + student} onChange={this.handleChange}
                                    placeholder="Jan K." value={eval("this.state.inputName" + student) || ""}></input>
                                </div>
                                <div className="form-group student-template-element">
                                    <label for="inputEmail">Email</label>
                                    <input type="email" className="form-control" id={"inputEmail" + student} aria-describedby="emailHelp" onChange={this.handleChange}
                                    placeholder="Email" value={eval("this.state.inputEmail" + student) || ""}></input>
                                </div>
                            </div>
                            </>
                        ))} 
                    
                    <div className="form-group">
                        <label for="inputClassName">Nazwa kursu</label>
                        <input type="text" className="form-control" id="inputClassName" onChange={this.handleChange}
                        placeholder="Nazwa kursu" value={this.state.inputClassName || ""}></input>
                    </div>
                    <div className="form-group">
                        <label for="textareaDescription">Opis projektu</label>
                        <textarea className="form-control" id="textareaDescription" rows="3" onChange={this.handleChange}
                        placeholder="Opis" value={this.state.textareaDescription || ""}></textarea>
                    </div>
                    <div className="form-group">
                        <label for="inputTags">Tagi</label>
                        <input type="text" className="form-control" id="inputTags" onChange={this.handleChange}
                        placeholder="np.: JS, C++, HTML, Python" value={this.state.inputTags || ""}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Dodaj</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleAddStudent}>Dodaj nast??pnego studenta</button>
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
    }
};
  
export default GroupAddForm;