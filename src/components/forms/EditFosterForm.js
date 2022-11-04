import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

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
    [])

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

        <form className="px-5 my-20 max-w-3xl mx-auto space-y-6">

        <div className="text-6xl font-amatic font-bold tracking-wider text-center"> Update Foster </div>
            
            <fieldset>
                <div className="form">
                    <label htmlFor="name">Name:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
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
                    <label htmlFor="imageUrl">Image UrL:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
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
                    <div>Age:</div>
                    {ageRanges.map((ageRange) => {
                        return (
                            <div key={ageRange.id} className="radio">
                                <label>
                                    <input 
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
                    <div>Fur Pattern:</div>
                    {furPatterns.map((furPattern) => {
                        return (
                            <div key={furPattern.id} className="radio">
                                <label>
                                    <input 
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
                    <div>Hogwart House:</div>
                    {hogwartHouses.map((hogwartHouse) => {
                        return (
                            <div key={hogwartHouse.id} className="radio">
                                <label>
                                    <input 
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
                    <label htmlFor="description">Description:</label>
                    <textarea className="border border-slate-300 block w-full py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
                        required autoFocus
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
                    <label htmlFor="fixed">Birthdate:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
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
                    <label htmlFor="vaccine1">FVRCP Vaccine 1:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
                        required autoFocus
                        id="fvrcpVaccine1"
                        type="text"
                        value={foster.fvrcpVaccine1}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine2">FVRCP Vaccine 2:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
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
                    <label htmlFor="vaccine3">FVRCP Vaccine 3:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
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
                    <label htmlFor="vaccine4">FeLV Vaccine:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
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
                    <label htmlFor="vaccine5">Rabies Vaccine:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
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
                    <label htmlFor="fixed">Spayed/Neutured?</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
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
                    <label htmlFor="fosterParent">Foster Parent:</label>
                            <select className="border w-1/2 border-slate-300 block py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
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
                                    {   
                                    return <option key={fosterParent.id} value={fosterParent.id}>
                                        {fosterParent?.user?.fullName}</option>
                                    }
                                })}
                            </select>
                    </div>
            </fieldset>

            <button 
                className="mr-2 bg-violet-500 py-2 px-4 text-white rounded"
                onClick={(event) => {
                    handleSaveButtonClick(event)
                }}
            >
            Save Edits
            </button>
            
            <button 
                className="bg-violet-500 py-2 px-4 text-white rounded"
                onClick={(event) => {
                    deleteButton(event)
                }}
            >
            Delete
            </button>
            
        </form>
    </>
}