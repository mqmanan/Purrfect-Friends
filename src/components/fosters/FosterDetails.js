import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export const FosterDetails = () => {
    const { fosterId } = useParams()
    const navigate = useNavigate()
    const [ foster, setFoster ] = useState([])

    // useState Hook tracks the state of varaible(s) in a function component
    // useEffect Hook tells React that your component needs to do something after render

    useEffect(
        () => {
            fetch(`http://localhost:8088/fosters/${fosterId}`)
                .then(response => response.json())
                .then((data) => {
                    setFoster(data)
                })
        },
        [fosterId]
    )

    return <section className="flex flex-wrap py-36">

            <div className="absolute left-80">
                <img className="border-solid border-8 border-violet-300 rounded-xl drop-shadow-lg hover:shadow-xl" 
                    src={foster.imageUrl} 
                    alt={foster.name} 
                    width="360px"
                />
            </div>
        

            <div className="absolute inset-y-48 top-40 right-80 w-1/3 font-biz px-4 py-9
                    border-double border-8 rounded-2xl border-violet-300">
                <div className="font-amatic text-4xl text-violet-600 mb-4">
                    <b>{foster.name} </b></div>
                <div className="tracking-tight mb-4">
                    <b>Birthday:</b> {foster.dob}</div>
                <div className="font-biz tracking-tight mb-4 text-justify">
                    <b>Description:</b> {foster.description}</div>
                <div className="tracking-tight mb-2">
                    <b>Fixed:</b> {foster.spayedNeutered}</div>
            </div>

            <div className="absolute bottom-32 right-72">
                <button className="bg-violet-300 rounded-xl text-violet-800 py-2 px-3 mt-10 mb-10 
                        font-amatic font-extrabold text-2xl tracking-wide hover:tracking-wider hover:text-3xl hover:text-white hover:bg-gradient-to-r from-pink-500 to-purple-500"
                        type="submit"
                        onClick={() => {
                            navigate("/contact")
                        }}
                    >🐱 Set up a play date with {foster.name}!
                </button>
                </div>
      
    </section>
}
