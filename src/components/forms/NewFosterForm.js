import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    const [ageRanges, setAgeRanges] = useState([])
    const [furPatterns, setFurPatterns] = useState([])
    const [hogwartHouses, setHogwartHouses] = useState([])
    const [fosterParents, setFosterParents] = useState([])
    const navigate = useNavigate()

    const [fosterForm, setFosterForm] = useState({
        name: "",
        imageUrl: "",
        ageId: 0,
        furPatternId: 0,
        hogwartHouseId: 0,
        fosterParentId: 0
    })

    const currentPurrfectUser = localStorage.getItem("purrfect_user")
    const purrfectUserObj = JSON.parse(currentPurrfectUser)

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

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const newFoster = {
            name: ticket.name,
            imageUrl: ticket.imageUrl,
            description: ticket.description,
            typeId: ticket.typeId,
            price: ticket.price
        }

    // make  funciton to store userChoices ticket

        // const handleInputChange = (event) => {
        //     const copy = {...ticket}
        //     copy[event.target.name] = event.target.value
        //     setTicket(copy)
        // }

        // this will post new userChoices ticket to database

        if (
            fosterForm.name && 
            fosterForm.imageUrl && 
            fosterForm.description && 
            fosterForm.typeId && 
            fosterForm.price &&
            fosterForm.price

            name: "",
        imageUrl: "",
        ageId: 0,
        furPatternId: 0,
        hogwartHouseId: 0,
        fosterParentId: 0
        ) {
            fetch('http://localhost:8088/products', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFoster),
            })
                .then((response) => response.json())
                .then(() => navigate("/fosters"))    
        } else {
            alert("Fill out the entire form please!")
        }
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">✨ New Candy ✨</h2>

            <fieldset>
                <div className="form">
                    <label htmlFor="name">Name:</label>
                    <input
                        required
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="Candy name"
                        value={ticket.name}
                        onChange={
                            (event) => {
                                const copy = {...ticket}
                                copy.name = event.target.value
                                setTicket(copy)
                            }
                        } />
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
                        placeholder="Example.com"
                        value={ticket.imageUrl}
                        onChange={
                            (event) => {
                                const copy = {...ticket}
                                copy.imageUrl = event.target.value
                                setTicket(copy)
                            }
                        } 
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="description">Description:</label>
                    <input
                        required
                        id="description"
                        type="text"
                        className="form-control"
                        placeholder="Candy Description"
                        value={ticket.description}
                        onChange={
                            (event) => {
                                const copy = {...ticket}
                                copy.description = event.target.value
                                setTicket(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <div>Type:</div>
                    {types.map((type) => {
                        return (
                            <div key={type.id} className="radio">
                                <label>
                                    <input 
                                    type ="radio" 
                                    value={type.id} 
                                    checked={ticket.typeId === type.id}
                                    onChange={(event) => {
                                        const copy = { ...ticket }
                                        copy.typeId = parseInt(event.target.value)
                                        setTicket(copy)
                                    }}
                                />
                                {type.name}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="price">Price:</label>
                    <input
                        required
                        id="price"
                        type="integer"
                        className="form-control"
                        placeholder="Candy Price"
                        value={ticket.price}
                        onChange={
                            (event) => {
                                const copy = {...ticket}
                                copy.price = event.target.value
                                setTicket(copy)
                            }
                        } />
                </div>
            </fieldset>


            <button 
                className="btn-submit" 
                onClick={(event) => {
                    handleSaveButtonClick(event)
                    }}
                >
                Submit Ticket
            </button><br></br><br></br>
        </form>
    )
}