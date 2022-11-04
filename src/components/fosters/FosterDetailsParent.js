import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export const FosterDetailsParent = () => {
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

    return <>

    {/* <section className="flex flex-col pl-20">

        <div className="font-amatic text-7xl text-center text-violet-700 mt-6">
                {foster.name}
        </div>

            <div className="text-center">
                <button className="bg-violet-300 rounded-xl text-white py-1 px-3 mt-10 mb-10 font-amatic text-xl
                        hover:bg-pink-500 hover:tracking-widest"
                        type="submit"
                        onClick={() => {
                            navigate("/fosters/:fosterId/edit")
                        }}
                    >
                    Modify
                </button>
            </div>
    </section> */}

        <section className="flex flex-wrap p-20">
            
                <div className="absolute right-72 top-48">
                <img className="border-4 border-violet-400 rounded-3xl drop-shadow-lg" 
                    src={foster.imageUrl} 
                    alt={foster.name} 
                    width="360px"
                />
                </div>

                <div className="absolute left-1/3 top-36 w-1/4 font-biz px-9 py-8 shadow-lg
                    border-4 rounded-2xl border-violet-500 bg-violet-300 text-slate-800">
                    <div className="font-amatic text-4xl text-violet-600 mb-4"><b>{foster.name} </b></div>
                    <div className="tracking-tight mb-5"><b>🎉 Birthday </b> {foster.dob} 🎉 </div>
                    <div className="font-biz tracking-tight text-justify mb-5"> {foster.description} </div>
                    <div className="text-md tracking-wide"><b>Fixed?</b> {foster.spayedNeutered} </div>
                </div>

                <div className="px-6 py-5 absolute left-64 font-biz shadow-md
                    border-4 rounded-2xl border-violet-500 bg-violet-300 text-slate-800">
                    <div className="font-amatic text-4xl text-violet-600 mb-3"><b>Vaccinations</b></div>
                    <div className="text-lg mb-4"><b>FVRCP 1</b> - {foster.fvrcpVaccine1}</div>
                    <div className="text-lg mb-4"><b>FVRCP 2</b> - {foster.fvrcpVaccine2}</div>
                    <div className="text-lg mb-4"><b>FVRCP 3</b> - {foster.fvrcpVaccine3}</div>
                    <div className="text-lg mb-4"><b>FeLV </b> - {foster.felvVaccine}</div>
                    <div className="text-lg"><b>Rabies </b> - {foster.rabies}</div>
                </div>

                <div className="absolute right-60 top-20">
                <button className="hover:bg-violet-800 rounded-xl text-black py-1 px-3 mt-10 mb-10 font-amatic
                        bg-violet-400 hover:text-white hover:tracking-widest hover:font-bold
                        text-2xl tracking-wide font-bold"
                        type="submit"
                        onClick={() => {
                            navigate(`/fosters/${foster.id}/edit`)
                        }}
                    >Edit {foster.name}'s profile
                </button>
                </div>

            </section>
    </>
}
