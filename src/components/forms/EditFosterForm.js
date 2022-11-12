import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Player } from '@lottiefiles/react-lottie-player'

export const EditFosterForm = () => {
    const { fosterId } = useParams()
    const [ageRanges, setAgeRanges] = useState([])
    const [furPatterns, setFurPatterns] = useState([])
    const [hogwartHouses, setHogwartHouses] = useState([])
    const [fosterParents, setFosterParents] = useState([])
    
    const navigate = useNavigate()

    const [ foster, updateFoster ] = useState({
        name: "",
        imageUrl: "",
        ageRangeId: 0,
        furPatternId: 0,
        hogwartHouseId: 0,
        dob: "",
        description: "",
        fvrcpVaccine1: "",
        fvrcpVaccine2: "",
        fvrcpVaccine3: "",
        felvVaccine: "",
        rabies: "",
        spayedNeutered: "",
        fosterParentId: 0
    })

    // this gets specific foster info from API & updates state
    useEffect(() => {
        fetch(`http://localhost:8088/fosters/${fosterId}`)
            .then(response => response.json())
            .then((data) => {                
                updateFoster(data)
            })
    },
    [fosterId])

    useEffect(
        () => {
            fetch(`http://localhost:8088/ageRanges`)
                .then(response => {
                    return response.json()})
                .then((ageArray) => {
                    setAgeRanges(ageArray)
                    return ageArray
                })
        },
        [] // when this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/furPatterns`)
                .then(response => {
                    return response.json()})
                .then((furPatternArray) => {
                    setFurPatterns(furPatternArray)
                    return furPatternArray
                })
        },
        [] 
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/hogwartHouses`)
                .then(response => {
                    return response.json()})
                .then((hogwartsArray) => {
                    setHogwartHouses(hogwartsArray)
                    return hogwartsArray
                })
        },
        [] 
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/fosterParents?_expand=user`)
                .then(response => {
                    return response.json()})
                .then((parentsArray) => {
                    setFosterParents(parentsArray)
                    return parentsArray
                })
        },
        []
    )

    const handleInputChange = (event) => {
        const copy = { ...foster }
        copy[event.target.id] = event.target.value
        updateFoster(copy)
    }

    // function that will DELETE specific foster data and then navigate to fosters page when done
    // if functions are within a form as a button, you will always need to use preventDefault
    const deleteButton = (event) => {
        event.preventDefault()
        
        fetch(`http://localhost:8088/fosters/${foster.id}`, {
            method: "DELETE",
        })
            .then(() => {
                navigate("/fosters")
            })
    }


    // function that will PUT updated data into the API and then navigate to fosters page when done
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/fosters/${foster.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(foster)
        })
            .then(() => {
                navigate("/fosters")
            })
    }

    return <>

    <div className="relative inset-0 md:fixed md:w-5/12">
        <span className="absolute bottom-16 left-16 p-20 text-black text-8xl 
            font-amatic font-bold tracking-wide">
            Update Foster
        </span>
        <Player
            src='https://assets8.lottiefiles.com/private_files/lf30_bwykk9xb.json'
            className="object-cover w-full h-full items-center"
            loop
            autoplay
            style={{ height: '490px', width: '480px' }}
        />
    </div>

        <div className="w-full ml-auto md:w-7/12">
            <div className="flex flex-col items-left justify-center bg-purple-200 px-10 py-7">

        <form className="font-biz space-y-5">
            
            <fieldset>
                <div className="form">
                    <label htmlFor="name" className="font-bold text-lg ml-1">Name:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded-xl focus:outline-none focus:border-violet-400"
                        required
                        autoFocus
                        id="name"
                        type="text"
                        value={foster.name}
                        onChange={handleInputChange}
                        /> 
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="imageUrl" className="font-bold text-lg ml-1">Image UrL:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded-xl focus:outline-none focus:border-violet-400"
                        required
                        id="imageUrl"
                        type="text"
                        value={foster.imageUrl}
                        onChange={handleInputChange} 
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <div className="font-bold text-lg">Age:</div>
                    {ageRanges.map((ageRange) => {
                        return (
                            <div key={ageRange.id} className="radio">
                                <label>
                                    <input className="focus:ring-pink-500 text-violet-500 mr-2" 
                                    type ="radio" 
                                    value={ageRange.id} 
                                    checked={foster.ageRangeId === ageRange.id}
                                    onChange={(event) => {
                                        const copy = { ...foster}
                                        copy.ageRangeId = parseInt(event.target.value)
                                        updateFoster(copy)
                                    }}
                                />
                                {ageRange.name}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <div className="font-bold text-lg">Fur Pattern:</div>
                    {furPatterns.map((furPattern) => {
                        return (
                            <div key={furPattern.id} className="radio">
                                <label>
                                <input className="focus:ring-pink-500 text-violet-500 mr-2"
                                    type ="radio" 
                                    value={furPattern.id} 
                                    checked={foster.furPatternId === furPattern.id}
                                    onChange={(event) => {
                                        const copy = { ...foster }
                                        copy.furPatternId = parseInt(event.target.value)
                                        updateFoster(copy)
                                    }}
                                />
                                {furPattern.name}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <div className="font-bold text-lg">Hogwarts House:</div>
                    {hogwartHouses.map((hogwartHouse) => {
                        return (
                            <div key={hogwartHouse.id} className="radio">
                                <label>
                                <input className="focus:ring-pink-500 text-violet-500 mr-2" 
                                    type ="radio" 
                                    value={hogwartHouse.id} 
                                    checked={foster.hogwartHouseId === hogwartHouse.id}
                                    onChange={(event) => {
                                        const copy = { ...foster }
                                        copy.hogwartHouseId = parseInt(event.target.value)
                                        updateFoster(copy)
                                    }}
                                />
                                {hogwartHouse.name}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="description" className="font-bold text-lg ml-1">Description:</label>
                    <textarea className="border border-slate-300 block w-full py-1 px-2 rounded-xl focus:outline-none focus:border-violet-400"
                        required
                        id="description"
                        type="text"
                        style={{
                            height: "10rem"
                            }}
                        value={foster.description}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="fixed" className="font-bold text-lg ml-1">Birthdate:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded-xl focus:outline-none focus:border-violet-400"
                        required
                        id="dob"
                        type="text"
                        value={foster.dob}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine1" className="font-bold text-lg ml-1">FVRCP Vaccine 1:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded-xl focus:outline-none focus:border-violet-400"
                        required
                        id="fvrcpVaccine1"
                        type="text"
                        value={foster.fvrcpVaccine1}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine2" className="font-bold text-lg ml-1">FVRCP Vaccine 2:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded-xl focus:outline-none focus:border-violet-400"
                        required
                        id="fvrcpVaccine2"
                        type="text"
                        value={foster.fvrcpVaccine2}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine3" className="font-bold text-lg ml-1">FVRCP Vaccine 3:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded-xl focus:outline-none focus:border-violet-400"
                        required
                        id="fvrcpVaccine3"
                        type="text"
                        value={foster.fvrcpVaccine3}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine4" className="font-bold text-lg ml-1">FeLV Vaccine:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded-xl focus:outline-none focus:border-violet-400"
                        required
                        id="felvVaccine"
                        type="text"
                        value={foster.felvVaccine}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine5" className="font-bold text-lg ml-1">Rabies Vaccine:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded-xl focus:outline-none focus:border-violet-400"
                        required
                        id="rabies"
                        type="text"
                        value={foster.rabies}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="fixed" className="font-bold text-lg ml-1">Spayed/Neutured?</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded-xl focus:outline-none focus:border-violet-400"
                        required
                        id="spayedNeutered"
                        type="text"
                        value={foster.spayedNeutered}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="fosterParent" className="font-bold text-lg ml-1">Foster Parent:</label>
                            <select className="border w-full border-slate-300 block py-1 px-2 mb-3 rounded-xl focus:outline-none focus:border-violet-400"
                                required
                                id = "fosterParent"
                                type ="text"
                                value={foster.fosterParentId} 
                                onChange={(event) => {
                                    const copy = { ...foster }
                                    copy.fosterParentId = parseInt(event.target.value)
                                    updateFoster(copy)
                                }}
                            >
                                <option>✦ Select Foster Parent ✦</option>
                                {fosterParents.map((fosterParent) => {  
                                    return <option key={fosterParent.id} value={fosterParent.id}>
                                        {fosterParent?.user?.fullName}</option>
                                    }
                                )}
                            </select>
                    </div>
            </fieldset>

            <button 
                className="bg-violet-300 px-2 py-1 text-black rounded-xl font-amatic text-xl 
                   font-extrabold hover:bg-emerald-600 hover:text-white tracking-wider mr-2"
                onClick={(event) => {
                    handleSaveButtonClick(event)
                }}
            >
            Update
            </button>
            
            <button 
                className="bg-violet-300 px-2 py-1 text-black rounded-xl font-amatic text-xl 
                   font-extrabold hover:bg-red-600 hover:text-white tracking-wider mr-2"
                onClick={(event) => {
                    deleteButton(event)
                }}
            >
            Delete
            </button>

            <button 
                type="button"
                className="bg-violet-300 px-2 py-1 text-black rounded-xl font-amatic text-xl 
                            font-extrabold hover:bg-violet-600 hover:text-white tracking-wider"
                onClick={() => {
                    navigate("/")
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                }}
            >
            Home
            </button>
            
        </form>
        </div>
        </div>
    </>
}