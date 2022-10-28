import { useEffect, useState } from "react"
import { Message } from "./Message.js" 

export const MessageList = () => {
    const [messages, setMessages] = useState([])
    const [fosterParents, setFosterParents] = useState([])

	const currentPurrfectUser = localStorage.getItem("purrfect_user")
    const purrfectUserObj = JSON.parse(currentPurrfectUser)

    const getAllMessages = () => {
        fetch(`http://localhost:8088/messages?_embed=fosterParentMessages`)
        .then(response => {
            return response.json()})
        .then((messageArray) => {
            setMessages(messageArray)
            return messageArray
        })
    }

    useEffect(
        () => {
            getAllMessages()

            fetch(`http://localhost:8088/fosterParents?_expand=user`)
                .then(response => {
                    return response.json()})
                .then((fosterParentArray) => {
                    setFosterParents(fosterParentArray)
                    return fosterParentArray
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
        
        <center><div className="mailbox">✨ Maaaaail ✨</div></center>

        <article className="message">
            {
                messages.map(
                    (message) => <Message key={message.id} 
                    currentUser={purrfectUserObj} 
                    message={message} 
                    getAllMessages={getAllMessages}
                    fosterParents={fosterParents} />
            )
        }
         </article>
    </>
}