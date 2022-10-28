import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export const MessageDetails = () => {
    const { messageId } = useParams()
    const [ message, setMessage ] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/messages/${messageId}`)
                .then(response => response.json())
                .then((data) => {
                    setMessage(data)
                })
        },
        [ messageId ]
    )

    return <div className="message" key={message.id}>
        <center><br></br>
            
        <div className="message-details">
            <u>Letter #{message.id}</u>
        </div>        

        <div className="message-details">
            <b>From:</b> {message.name}<br></br>
            <b>Email:</b> {message.email}<br></br><br></br>
            <b>Subject:</b> {message.subject}<br></br>
            {message.body}<br></br>
        </div>
            
        </center>
        </div>
}
