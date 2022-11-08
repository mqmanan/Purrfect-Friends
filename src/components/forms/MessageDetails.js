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

    return <div className="p-24">

            <div className="">
                <Player
                    src='https://assets5.lottiefiles.com/private_files/lf30_mwzutzkk.json'
                    className="absolute right-72 top-7 opacity-80"
                    loop
                    autoplay
                    style={{ height: '600px', width: '600px' }}
                />
            </div>
   
        <div className="font-amatic text-5xl mb-3 mt-16 px-24">
            <u>Letter #{message.id}</u>
        </div>        

        <div className="message-details text-lg px-24">
            <span className="block font-biz tracking-wide mb-1"><b>From</b>: {message.name}</span>
            <span className="block font-biz tracking-wide mb-1"><b>Email</b>: {message.email}</span> 
            <span className="block font-biz tracking-wide mb-5"><b>Subject</b>: {message.subject}</span> 
            <span className="block font-biz tracking-wide"> {message.body}</span>
        </div>

        <div className="absolute left-48">
                <button className="bg-violet-300 rounded-xl text-violet-800 py-2 px-3 mt-10 mb-10 
                        font-amatic text-2xl tracking-wider hover:bg-pink-600 hover:tracking-widest
                        hover:text-3xl hover:text-white"
                        type="submit"
                        onClick={() => {
                            navigate("/mailbox")
                        }}
                    >✉ Mailbox
                </button>
        </div>
            
        </div>
}
