import { useState, useEffect } from "react"

export const MessageForm = () => {
 /*
        TODO: Add the correct default properties to the
        initial state object
    */
        const [messageForm, setMessageForm] = useState({
            name: "",
            email: "",
            subject: "",
            body: ""
        })

        const handleInputChange = (event) => {
            const copy = { ...messageForm }
            copy[event.target.id] = event.target.value
            setMessageForm(copy)
        }
        
        const handleSaveButtonClick = (event) => {
            event.preventDefault()
    
            // TODO: Create the object to be saved to the API
        const newMessage = {
            name: messageForm.name,
            email: messageForm.email,
            subject: messageForm.subject,
            body: messageForm.body
        }
    
            // TODO: Perform the fetch() to POST the object to the API

            if (
                messageForm.name &&
                messageForm.email &&
                messageForm.subject &&
                messageForm.body
            ) {
                fetch('http://localhost:8088/messages', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMessage), //converts JSON data to JavaScript data
                })
                    .then((response) => response.json())
                    .then(() => {
                        alert("Message sent!")
                    })   
            }
        }

        return (
            <>

            <center>

            <img src="https://www.goodmews.org/wp-content/uploads/header_image_cats2.jpg" alt="catsbanner" /><br></br>
            </center>

            <form className="messageForm">
                <div className="message-title">Send Us Messages!</div>

                <fieldset>
                <div className="form">
                    <label htmlFor="name">Name:</label>
                    <input
                        required
                        autoFocus
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        value={messageForm.name}
                        onChange={handleInputChange}
                        /> 
                </div>
            </fieldset>

                <fieldset>
                <div className="form">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        required
                        id="email"
                        type="text"
                        className="form-control"
                        placeholder="example@gmail.com"
                        value={messageForm.email}
                        onChange={handleInputChange}
                        /> 
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        required
                        id="subject"
                        type="text"
                        className="form-control"
                        placeholder="Subject like -- interested in becoming a foster parent"
                        value={messageForm.subject}
                        onChange={handleInputChange}
                        /> 
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="body">Body:</label>
                    <textarea
                        required
                        id="body"
                        type="text"
                        style={{
                            height: "10rem"
                            }}
                        className="form-control"
                        placeholder="Type your message.."
                        value={messageForm.body}
                        onChange={handleInputChange}
                        /> 
                </div>
            </fieldset>

                <button 
                    className="btn btn-primary"
                    onClick={(event) => {
                        handleSaveButtonClick(event)
                        }}
                    >
                    Send Message
                </button><br></br><br></br>
            </form>
            </>
        )
}