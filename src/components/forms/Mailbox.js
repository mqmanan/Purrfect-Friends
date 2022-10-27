import { useEffect, useState } from "react"

export const Mailbox = () => {
    const [messages, setMessages] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/messages`)
                .then(response => {
                    return response.json()})
                .then((messageArray) => {
                    setMessages(messageArray)
                    return messageArray
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
        
        <center><div className="mailbox">✨ Maaaaail ✨</div></center>
        <article className="message">
        {
                messages.map((message) => {
                    return <div className="message" key={message.id}>
                    <div className="message-details">
                        <b>Name:</b> {message.name}<br></br>
                        <b>Email:</b> {message.email}<br></br>
                        <b>Subject:</b> <i>{message.subject}</i><br></br>
                        <i>{message.body}</i>
                    </div>
                </div>
            })
        }
         </article>
    </>
}