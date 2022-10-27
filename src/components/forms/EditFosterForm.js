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

    const handleInputChange = (event) => {
        const copy = { ...foster }
        copy[event.target.id] = event.target.value
        updateFoster(copy)
    }

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

    // TODO: Get foster info from API and update state
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




    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the information.
            Navigate user to home page when done.
        */

        return fetch(`http://localhost:8088/fosters/${foster.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(foster)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/fosters")
            })
    }

    return <>

        <form className="profile">
            <div className="profile__title">Update Foster Details</div>
            
            <fieldset>
                <div className="form">
                    <label htmlFor="name">Name:</label>
                    <input
                        required
                        autoFocus
                        id="name"
                        type="text"
                        className="form-control"
                        value={foster.name}
                        onChange={handleInputChange}
                        /> 
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="imageUrl">Image UrL:</label>
                    <input
                        required
                        id="imageUrl"
                        type="text"
                        className="form-control"
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
                    <textarea
                        required autoFocus
                        id="description"
                        type="text"
                        style={{
                            height: "10rem"
                            }}
                        className="form-control"
                        value={foster.description}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="fixed">Birthdate:</label>
                    <input
                        required
                        id="dob"
                        type="text"
                        className="form-control"
                        value={foster.dob}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine1">FVRCP Vaccine 1:</label>
                    <input
                        required autoFocus
                        id="fvrcpVaccine1"
                        type="text"
                        className="form-control"
                        value={foster.fvrcpVaccine1}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine2">FVRCP Vaccine 2:</label>
                    <input
                        required
                        id="fvrcpVaccine2"
                        type="text"
                        className="form-control"
                        value={foster.fvrcpVaccine2}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine3">FVRCP Vaccine 3:</label>
                    <input
                        required
                        id="fvrcpVaccine3"
                        type="text"
                        className="form-control"
                        value={foster.fvrcpVaccine3}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine4">FeLV Vaccine:</label>
                    <input
                        required
                        id="felvVaccine"
                        type="text"
                        className="form-control"
                        value={foster.felvVaccine}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="vaccine5">Rabies Vaccine:</label>
                    <input
                        required
                        id="rabies"
                        type="text"
                        className="form-control"
                        value={foster.rabies}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="fixed">Spayed/Neutured?</label>
                    <input
                        required
                        id="spayedNeutered"
                        type="text"
                        className="form-control"
                        value={foster.spayedNeutered}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="fosterParent">Foster Parent:</label>
                            <select 
                                required
                                autoFocus
                                id = "fosterParent"
                                type ="text"
                                className = "form-control" 
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
                className="btn-submit" 
                onClick={(event) => {
                    handleSaveButtonClick(event)
                    }}
                >
                Save Edits
            </button><br></br><br></br>
        </form>
    </>
}