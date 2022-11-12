import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Player } from '@lottiefiles/react-lottie-player'

export const MessageDetails = () => {
    const { messageId } = useParams()
    const navigate = useNavigate()
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

    return <div className="p-28">

            <div className="">
                <Player
                    src='https://assets10.lottiefiles.com/packages/lf20_suiu8fzx.json'
                    className="absolute left-1/2 bottom-54 opacity-50"
                    loop
                    autoplay
                    style={{ height: '450px', width: '450px' }}
                />
            </div>
   
        <div className="font-amatic text-5xl mb-4 mt-11 px-36">
            <u>Letter #{message.id}</u>
        </div>        

        <div className="message-details text-lg px-36 w-1/2">
            <span className="block font-biz tracking-wide mb-1"><b>From</b>: {message.name}</span>
            <span className="block font-biz tracking-wide mb-1"><b>Email</b>: {message.email}</span> 
            <span className="block font-biz tracking-wide mb-8"><b>Subject</b>: {message.subject}</span> 
            <span className="block font-biz tracking-wide"> {message.body}</span>
        </div>

        <div className="absolute left-64">
                <button className="bg-violet-300 rounded-xl text-violet-800 py-2 px-3 mt-11 
                        font-amatic text-2xl tracking-wider hover:tracking-widest hover:text-3xl 
                        hover:text-white hover:bg-gradient-to-r from-pink-500 to-purple-500
                        hover:animate-bounce"
                        type="submit"
                        onClick={() => {
                            navigate("/mailbox")
                        }}
                    >✉ Mailbox
                </button>
        </div>
            
        </div>
}
