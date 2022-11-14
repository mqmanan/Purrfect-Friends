import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Player } from '@lottiefiles/react-lottie-player'

export const MessageForm = () => {

    const navigate = useNavigate()
    
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
                        // alert("Message sent!")
                        navigate("/")
                    })   
            }
        }

        return <>
        <div className="flex px-40 bg-white">

            <div className="py-28 pl-11 place-content-center">
                {/* <img className="rounded-3xl shadow-lg" src="https://preview.redd.it/t21s5oe0f6p61.jpg?auto=webp&s=9c30d89ba1881ee074260e2d54b2299097c398aa" alt="catslaptop" width="300"/> */}

                <Player
                        src='https://assets5.lottiefiles.com/packages/lf20_Yfas6J.json'
                        className=""
                        loop
                        autoplay
                        style={{ height: '450px', width: '450px' }}
                    />
            </div>

            <form className="flex-1 mt-28 space-y-2 place-content-center tracking-wide mb-11">

                <div className="font-amatic">
                    <span className="text-4xl font-extrabold">Contact Us ✉ </span>
                    <span className="text-3xl font-extrabold tracking-wider"> 
                        We'll respond within 24 hrs!</span>
                </div>

                <fieldset>
                <div className="font-biz text-xl">
                    <input className="border border-violet-300 block w-full py-1 px-3 rounded focus:border-violet-700 font-bold tracking-wider" 
                        required
                        autoFocus
                        id="name"
                        type="text"
                        placeholder="How should we address you?"
                        value={messageForm.name}
                        onChange={handleInputChange}
                        /> 
                </div>
                </fieldset>

                <fieldset>
                <div className="font-biz text-xl">
                    <input className="border border-violet-300 block w-full py-1 px-3 rounded focus:outline-none focus:border-violet-700 font-bold tracking-wider" 
                        required
                        id="email"
                        type="text"
                        placeholder="Provide us an email address."
                        value={messageForm.email}
                        onChange={handleInputChange}
                        /> 
                </div>
                </fieldset>

                <fieldset>
                <div className="font-biz text-xl">
                    <input className="border border-violet-300 block w-full py-1 px-3 rounded focus:outline-none focus:border-violet-700 font-bold tracking-wider" 
                        id="subject"
                        type="text"
                        placeholder="Subject -- Adopting, Donation, etc."
                        value={messageForm.subject}
                        onChange={handleInputChange}
                        /> 
                </div>
                </fieldset>

                <fieldset>
                <div className="font-biz text-xl">
                    <textarea className="border border-violet-300 block w-full py-1 px-3 rounded focus:outline-none focus:border-violet-700 font-bold tracking-wider" 
                        required
                        id="body"
                        type="text"
                        style={{
                            height: "16rem"
                            }}
                        placeholder="How can we help you?"
                        value={messageForm.body}
                        onChange={handleInputChange}
                        /> 
                </div>
                </fieldset>

                <button className="bg-violet-300 rounded-xl text-white py-2 px-4 mt-2 
                        font-amatic text-2xl hover:tracking-widest font-extrabold 
                        hover:bg-gradient-to-r from-pink-500 to-purple-500 hover:animate-tilt"
                        type="submit"
                        onClick={(event) => {
                        handleSaveButtonClick(event)
                        navigate("/")
                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                        }}
                    >
                    Send  ✉
                </button>

                <footer className="text-violet-200 font-biz text-xs text-center p-10">ⓒ Purrfect Friends 2022</footer>

            </form>

        </div>    
    </>
}