import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const NewFosterForm = () => {
    const [ageRanges, setAgeRanges] = useState([])
    const [furPatterns, setFurPatterns] = useState([])
    const [hogwartHouses, setHogwartHouses] = useState([])
    const [fosterParents, setFosterParents] = useState([])
    const navigate = useNavigate()

    const [userChoices, setUserChoices] = useState({
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
        [] // When this array is empty, you are observing initial component state
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
        [] // When this array is empty, you are observing initial component state
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
        [] // When this array is empty, you are observing initial component state
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
        [] // When this array is empty, you are observing initial component state
    )

     // make  funciton to store userChoices ticket

    const handleInputChange = (event) => {
        const copy = { ...userChoices }
        copy[event.target.id] = event.target.value
        setUserChoices(copy)
    }

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

    const newFoster = {
        name: userChoices.name,
        imageUrl: userChoices.imageUrl,
        ageRangeId: userChoices.ageRangeId,
        furPatternId: userChoices.furPatternId,
        hogwartHouseId: userChoices.hogwartHouseId,
        dob: userChoices.dob,
        description: userChoices.description,
        fvrcpVaccine1: userChoices.fvrcpVaccine1,
        fvrcpVaccine2: userChoices.fvrcpVaccine2,
        fvrcpVaccine3: userChoices.fvrcpVaccine3,
        felvVaccine: userChoices.felvVaccine,
        rabies: userChoices.rabies,
        spayedNeutered: userChoices.spayedNeutered,
        fosterParentId: userChoices.fosterParentId
        }

        // this will post new userChoices ticket to database

        if (
            userChoices.name &&
            userChoices.imageUrl &&
            userChoices.ageRangeId &&
            userChoices.furPatternId &&
            userChoices.hogwartHouseId &&
            userChoices.dob &&
            userChoices.description &&
            userChoices.fvrcpVaccine1 &&
            userChoices.fvrcpVaccine2 &&
            userChoices.fvrcpVaccine3 &&
            userChoices.felvVaccine &&
            userChoices.rabies &&
            userChoices.spayedNeutered &&
            userChoices.fosterParentId
        ) {
            fetch('http://localhost:8088/fosters', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFoster),
            })
                .then((response) => response.json())
                .then(() => navigate("/fosters"))    
        // } else {
        //     alert("Fill out the entire form please!")
        }
    }

    return (
        <form className="px-5 my-20 max-w-3xl mx-auto space-y-6">

            <div className="text-6xl font-amatic font-bold tracking-wider text-center"> New Foster </div>

            <fieldset>
                <div className="form">
                    <label htmlFor="name">Name:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
                        required
                        id="name"
                        type="text"
                        placeholder="Foster name"
                        value={userChoices.name}
                        onChange={handleInputChange}
                        /> 
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="imageUrl">Image Url:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
                        required
                        id="imageUrl"
                        type="text"
                        placeholder="Example.com"
                        value={userChoices.imageUrl}
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
                                    checked={userChoices.ageRangeId === ageRange.id}
                                    onChange={(event) => {
                                        const copy = { ...userChoices }
                                        copy.ageRangeId = parseInt(event.target.value)
                                        setUserChoices(copy)
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
                                    checked={userChoices.furPatternId === furPattern.id}
                                    onChange={(event) => {
                                        const copy = { ...userChoices }
                                        copy.furPatternId = parseInt(event.target.value)
                                        setUserChoices(copy)
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
                                    checked={userChoices.hogwartHouseId === hogwartHouse.id}
                                    onChange={(event) => {
                                        const copy = { ...userChoices }
                                        copy.hogwartHouseId = parseInt(event.target.value)
                                        setUserChoices(copy)
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
                    <textarea className="border border-slate-300 block py-1 px-2 w-full rounded focus:outline-none focus:border-emerald-400"
                        required
                        id="description"
                        type="text"
                        style={{
                            height: "10rem"
                            }}
                        placeholder="Foster Description"
                        value={userChoices.description}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="fixed">Birthdate:</label>
                    <input className="border w-1/2 border-slate-300 block py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
                        required
                        id="dob"
                        type="text"
                        placeholder="Date of birth"
                        value={userChoices.dob}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine1">FVRCP Vaccine 1:</label>
                    <input className="border w-1/2 border-slate-300 block py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
                        required 
                        id="fvrcpVaccine1"
                        type="text"
                        placeholder="Date of Vaccine -- if none, type N/A"
                        value={userChoices.fvrcpVaccine1}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine2">FVRCP Vaccine 2:</label>
                    <input className="border w-1/2 border-slate-300 block py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
                        required
                        id="fvrcpVaccine2"
                        type="text"
                        placeholder="Date of Vaccine -- if none, type N/A"
                        value={userChoices.fvrcpVaccine2}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine3">FVRCP Vaccine 3:</label>
                    <input className="border w-1/2 border-slate-300 block py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
                        required
                        id="fvrcpVaccine3"
                        type="text"
                        placeholder="Date of Vaccine -- if none, type N/A"
                        value={userChoices.fvrcpVaccine3}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine4">FeLV Vaccine:</label>
                    <input className="border w-1/2 border-slate-300 block py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
                        required
                        id="felvVaccine"
                        type="text"
                        placeholder="Date of Vaccine -- if none, type N/A"
                        value={userChoices.felvVaccine}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine5">Rabies Vaccine:</label>
                    <input className="border w-1/2 border-slate-300 block py-1 px-2 rounded focus:outline-none focus:border-emerald-400"
                        required
                        id="rabies"
                        type="text"
                        placeholder="Date of Vaccine -- if none, type N/A"
                        value={userChoices.rabies}
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
                        placeholder="Yes or No?"
                        value={userChoices.spayedNeutered}
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
                                value={userChoices.fosterParentId} 
                                onChange={(event) => {
                                    const copy = { ...userChoices }
                                    copy.fosterParentId = parseInt(event.target.value)
                                    setUserChoices(copy)
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
                type="button"
                className="bg-violet-300 rounded-xl px-2 py-1 font-amatic 
                            tracking-wider text-xl font-bold hover:bg-violet-600 hover:text-white"
                onClick={(event) => {
                    handleSaveButtonClick(event)
                    }}
                >
                Submit Ticket
            </button><br></br><br></br>
        </form>
    )
}