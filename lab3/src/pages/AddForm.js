import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


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

            axios.get("https://dog.ceo/api/breeds/image/random").then(responsePicture => {
                const recieved_picture =  responsePicture.data.message;

                const newNewNode = {
                    add_student_name: inputs.inputName,
                    add_email: inputs.inputEmail,
                    add_class_name: inputs.inputClassName,
                    add_description: inputs.textareaDescription,
                    add_tags: inputs.inputTags,
                    picture: recieved_picture};
        
                setAdds({all: adds.all.concat([newNewNode]),
                    all_to_show: adds.all_to_show.concat([newNewNode])
                });
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
        <div className="add-form">
            <h2 className="subpage-header">Dodaj swoje ogłoszenie</h2>
            <form onSubmit={handleAddFormSubmit}>
                <div className="form-group">
                    <label for="inputName">Imię</label>
                    <input type="text" className="form-control" id="inputName" onChange={handleChange}
                    placeholder="Jan K." value={inputs.inputName || ""}></input>
                </div>
                <div className="form-group">
                    <label for="inputEmail">Email</label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={handleChange}
                    placeholder="Email" value={inputs.inputEmail || ""}></input>
                </div>
                <div className="form-group">
                    <label for="inputClassName">Nazwa kursu</label>
                    <input type="text" className="form-control" id="inputClassName" onChange={handleChange}
                    placeholder="Nazwa kursu" value={inputs.inputClassName || ""}></input>
                </div>
                <div className="form-group">
                    <label for="textareaDescription">Opis projektu</label>
                    <textarea className="form-control" id="textareaDescription" rows="3" onChange={handleChange}
                    placeholder="Opis" value={inputs.textareaDescription || ""}></textarea>
                </div>
                <div className="form-group">
                    <label for="inputTags">Tagi</label>
                    <input type="text" className="form-control" id="inputTags" onChange={handleChange}
                    placeholder="np.: JS, C++, HTML, Python" value={inputs.inputTags || ""}></input>
                </div>
                <button type="submit" className="btn btn-primary">Dodaj</button>
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