import { useEffect, useState } from "react"
import { Message } from "./Message.js" 

export const MessageList = () => {
    const [messages, setMessages] = useState([])
    const [fosterParents, setFosterParents] = useState([])

	const currentPurrfectUser = localStorage.getItem("purrfect_user")
    const purrfectUserObj = JSON.parse(currentPurrfectUser)

    // function will get all messages from API and it's now globally scoped
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

    // passing down PROPS in here

    return <>
        
        <div className="p-10">

            <div className="text-5xl font-amatic font-bold tracking-wider text-center mb-5"> 
            📬 Mailbox 📬
            </div>

            {/* <div className="flex mt-10 pr-3 pl-20 place-content-center">
                    <img className="rounded-3xl shadow-lg" src="https://c8p9p3e5.rocketcdn.me/wp-content/uploads/2021/09/we-just-got-a-letter-mail-meme-blues-clues-song.jpeg" alt="mail" width="350"/>
                </div> */}

                <article className="flex flex-col place-content-evenly">
                {
                    messages.map(
                        (message) => <Message 
                            key={message.id} 
                            currentUser={purrfectUserObj} 
                            message={message} 
                            getAllMessages={getAllMessages}
                            fosterParents={fosterParents} 
                        />
                    )
                }
                </article>
        </div>
    </>
}