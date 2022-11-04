import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export const MessageDetails = () => {
    const { messageId } = useParams()
    const [ message, setMessage ] = useState([])

    // useState Hook tracks the state of varaible(s) in a function component
    // useEffect Hook tells React that your component needs to do something after render

    useEffect(
        () => {
            fetch(`http://localhost:8088/messages/${messageId}`)
                .then(response => response.json())
                .then((data) => {
                    setMessage(data)
                })
        },
        [messageId] // dependency array -- watches if value changes
    )

    return <div className="p-20">
   
        <div className="font-amatic text-5xl mb-5 px-36">
            <u>Letter #{message.id}</u>
        </div>        

        <div className="message-details text-lg px-36">
            <span className="block font-biz tracking-wide mb-1"><b>From</b>: {message.name}</span>
            <span className="block font-biz tracking-wide mb-1"><b>Email</b>: {message.email}</span> 
            <span className="block font-biz tracking-wide mb-4"><b>Subject</b>: {message.subject}</span> 
            <span className="block font-biz tracking-wide"> {message.body}</span>
        </div>
            
        </div>
}
