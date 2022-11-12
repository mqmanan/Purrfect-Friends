import { useEffect, useState } from "react"
import { Message } from "./Message.js" 
import { Player } from '@lottiefiles/react-lottie-player'

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
        
        <div className="text-center">

            <div className="">
                <Player
                    src='https://assets8.lottiefiles.com/packages/lf20_1y8r2z0j.json'
                    className="absolute left-44 bottom-20"
                    loop
                    autoplay
                    style={{ height: '600px', width: '600px' }}
                />
            </div>

                <article className="absolute left-1/2 top-10 -space-y-3">
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