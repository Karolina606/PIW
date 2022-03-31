import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MessageSender = (props) => {
    // const setAdds = props.setAdds;
    // const adds = props.announcementsState;


    const [inputs, setInputs] = useState({ 
        inputName:"",
        inputEmail:"",
        textareaMessage:"",
    });
    
    const handleChange = (event) => {
        // event.preventDefault();

        const name = event.target.id;
        const value = event.target.value;
        console.log({value});
        setInputs(input => ({...inputs, [name]: value}));
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        if (inputs.inputName !== "" &&
            inputs.inputEmail !== "" &&
            inputs.textareaMessage !== ""){

            toast.success("Twoja wiadomość została wysłana zostało dodane", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setInputs({ 
                inputName:"",
                inputEmail:"",
                textareaMessage:"",
            });


        }else{
            toast.error('Musisz uzupełnić wszyskie pola, aby wysłać wiadomość!', {
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
        <div id="message-sender-form">
            <h2 class="subpage-header">Wyślij wiadomość do wybranej grupy</h2>
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
                    <label for="textareaMessage">Twoja wiadomość</label>
                    <textarea class="form-control" id="textareaMessage" rows="3" onChange={handleChange}
                    placeholder="Cześć!, bardzo chciałbym z Wami pracować ..." value={inputs.textareaMessage || ""}></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Wyślij wiadomość</button>
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
  
export default MessageSender;