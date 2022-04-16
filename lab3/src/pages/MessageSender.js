import React, { useRef, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MessageSender = (props) => {
    const messageTextAreaRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();

    useEffect(()=>{
        messageTextAreaRef.current.focus();
    });

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        if (nameRef.current.value !== "" &&
            emailRef.current.value !== "" &&
            messageTextAreaRef.current.value !== ""){

            toast.success("Twoja wiadomość została wysłana zostało dodane", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });


            nameRef.current.value = "";
            emailRef.current.value = "";
            messageTextAreaRef.current.value = "";

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
            <h2 className="subpage-header">Wyślij wiadomość do wybranej grupy</h2>
            <form onSubmit={handleAddFormSubmit}>
                <div className="form-group">
                    <label for="inputName">Imię</label>
                    <input type="text" className="form-control" id="inputName" ref={nameRef} onChange={(e)=>{nameRef.current.value = e.target.value}}
                    placeholder="Jan K."></input>
                </div>
                <div className="form-group">
                    <label for="inputEmail">Email</label>
                    <input type="email" className="form-control" id="inputEmail" ref={emailRef}  aria-describedby="emailHelp" onChange={(e)=>{emailRef.current.value = e.target.value}}
                    placeholder="Email"></input>
                </div>
                <div className="form-group">
                    <label for="textareaMessage">Twoja wiadomość</label>
                    <textarea className="form-control" id="textareaMessage" ref={messageTextAreaRef} rows="3" onChange={(e)=>{messageTextAreaRef.current.value = e.target.value}}
                    placeholder="Cześć!, bardzo chciałbym z Wami pracować ..." ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Wyślij wiadomość</button>
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