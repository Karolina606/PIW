import React, { useState } from "react";
// import Add from "./Add";
// import ReactDOM from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddForm = (props) => {
    const setAdds = props.setAdds;
    const adds = props.announcementsState;


    const [inputs, setInputs] = useState({ 
        inputName:"",
        inputEmail:"",
        inputClassName:"",
        textareaDescription:"",
        inputTags:"",
    });
    
    const handleChange = (event) => {
        // event.preventDefault();

        const name = event.target.id;
        const value = event.target.value;
        setInputs(input => ({...inputs, [name]: value}));
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        if (inputs.inputName !== "" &&
            inputs.inputClassName !== "" &&
            inputs.textareaDescription !== "" &&
            inputs.inputTags !== ""){

            console.log({inputs});
            const newNewNode = {
                add_student_name: inputs.inputName,
                add_email: inputs.inputEmail,
                add_class_name: inputs.inputClassName,
                add_description: inputs.textareaDescription,
                add_tags: inputs.inputTags};
    
            setAdds({all: adds.all.concat([newNewNode]),
                all_to_show: adds.all_to_show.concat([newNewNode])
            });
    
            setInputs({ 
                inputName:"",
                inputEmail: "",
                inputClassName: "",
                textareaDescription: "",
                inputTags: "",
            });


            toast.success("Twoje ogłoszenie zostało dodane", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }else{
            console.warn("Uzupełnij wszyskie pola, adby dodać ogłoszenie!");
            
            toast.error('Musisz uzupełnić wszyskie pola, aby dodać ogłoszenie!', {
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

    return <>
        <div class="add-form">
            <h2 class="subpage-header">Dodaj swoje ogłoszenie</h2>
            <form onSubmit={handleAddFormSubmit}>
                <div class="form-group">
                    <label for="inputName">Imię</label>
                    <input type="text" class="form-control" id="inputName" onChange={handleChange}
                    placeholder="Jan K." value={inputs.inputName || ""}></input>
                </div>
                <div class="form-group">
                    <label for="inputEmail">Email</label>
                    <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={handleChange}
                    placeholder="Email" value={inputs.inputEmail || ""}></input>
                </div>
                <div class="form-group">
                    <label for="inputClassName">Nazwa kursu</label>
                    <input type="text" class="form-control" id="inputClassName" onChange={handleChange}
                    placeholder="Nazwa kursu" value={inputs.inputClassName || ""}></input>
                </div>
                <div class="form-group">
                    <label for="textareaDescription">Opis projektu</label>
                    <textarea class="form-control" id="textareaDescription" rows="3" onChange={handleChange}
                    placeholder="Opis" value={inputs.textareaDescription || ""}></textarea>
                </div>
                <div class="form-group">
                    <label for="inputTags">Tagi</label>
                    <input type="text" class="form-control" id="inputTags" onChange={handleChange}
                    placeholder="np.: JS, C++, HTML, Python" value={inputs.inputTags || ""}></input>
                </div>
                <button type="submit" class="btn btn-primary">Dodaj</button>
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
};
  
export default AddForm;