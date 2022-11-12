import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Player } from '@lottiefiles/react-lottie-player'

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

    return (<>

    <div className="relative inset-0 w-full md:fixed md:w-6/12">
        <span className="absolute bottom-11 left-20 p-20 text-black text-8xl 
            font-amatic font-bold tracking-wide">
            New Foster Form
        </span>
        <Player
            src='https://assets3.lottiefiles.com/packages/lf20_fyilltcq.json'
            className="object-cover w-full h-full items-center"
            loop
            autoplay
            style={{ height: '530px', width: '530px' }}
        />
    </div>

    <div className="w-full ml-auto md:w-6/12">
        <div className="flex flex-col items-left justify-center bg-purple-200 px-10 py-7">

        <form className="font-biz space-y-5">

        <fieldset>
            <div className="form">
            <label htmlFor="name" className="font-bold text-lg ml-1">Name:</label>
            <input className="w-full border border-slate-300 block rounded-xl focus:outline-none focus:border-violet-700 shadow-sm"
                required autoFocus
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
        <label htmlFor="imageUrl" className="font-bold text-lg ml-1">Image Url:</label>
        <input className="w-full border border-slate-300 block rounded-xl 
            focus:outline-none focus:border-violet-700 shadow-sm"
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
        <div className="font-bold text-lg">Age:</div>
        {ageRanges.map((ageRange) => {
            return (
                <div key={ageRange.id} className="radio">
                    <label className="inline-flex items-center">
                        <input className="focus:ring-pink-500 text-violet-500 mr-2"
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
        <div className="font-bold text-lg">Fur Pattern:</div>
        {furPatterns.map((furPattern) => {
            return (
                <div key={furPattern.id} className="radio">
                    <label>
                        <input className="focus:ring-pink-500 text-violet-500 mr-2" 
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
        <div className="font-bold text-lg">Hogwarts House:</div>
        {hogwartHouses.map((hogwartHouse) => {
            return (
                <div key={hogwartHouse.id} className="radio">
                    <label>
                        <input className="focus:ring-pink-500 text-violet-500 mr-2"
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
        <label htmlFor="description" className="font-bold text-lg ml-1">Description:</label>
        <textarea className="w-full border border-slate-300 block rounded-xl focus:outline-none focus:border-violet-700 shadow-sm"
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
        <label htmlFor="fixed" className="font-bold text-lg ml-1">Birthdate:</label>
        <input className="w-full border border-slate-300 block rounded-xl focus:outline-none focus:border-violet-700 shadow-sm"
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
        <label htmlFor="vaccine1" className="font-bold text-lg ml-1">FVRCP Vaccine 1:</label>
        <input className="w-full border border-slate-300 block rounded-xl 
            focus:outline-none focus:border-violet-700 shadow-sm"
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
        <label htmlFor="vaccine2" className="font-bold text-lg ml-1">FVRCP Vaccine 2:</label>
        <input className="w-full border border-slate-300 block rounded-xl 
            focus:outline-none focus:border-violet-700 shadow-sm"
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
        <label htmlFor="vaccine3" className="font-bold text-lg ml-1">FVRCP Vaccine 3:</label>
        <input className="w-full border border-slate-300 block rounded-xl
            focus:outline-none focus:border-violet-700 shadow-sm"
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
        <label htmlFor="vaccine4" className="font-bold text-lg ml-1">FeLV Vaccine:</label>
        <input className="w-full border border-slate-300 block rounded-xl
            focus:outline-none focus:border-violet-700 shadow-sm"
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
        <label htmlFor="vaccine5" className="font-bold text-lg ml-1">Rabies Vaccine:</label>
        <input className="w-full border border-slate-300 block rounded-xl
            focus:outline-none focus:border-violet-700 shadow-sm"
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
        <label htmlFor="fixed" className="font-bold text-lg ml-1">Spayed/Neutured?</label>
        <input className="w-full border border-slate-300 block rounded-xl
            focus:outline-none focus:border-violet-700 shadow-sm"
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
        <label htmlFor="fosterParent" className="font-bold text-lg ml-1">Foster Parent:</label>
                <select className="w-full border border-slate-300 block rounded-xl 
                    focus:outline-none focus:border-violet-700 shadow-sm"
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
    className="bg-violet-300 rounded-xl px-2 py-1 font-amatic tracking-wider
                text-xl font-bold hover:bg-violet-600 hover:text-white mr-2 hover:animate-bounce"
    onClick={(event) => {
        handleSaveButtonClick(event)
        }}
    >
    Submit 
</button>

<button 
    type="button"
    className="bg-violet-300 rounded-xl px-2 py-1 font-amatic tracking-wider
                text-xl font-bold hover:bg-violet-600 hover:text-white hover:animate-bounce"
    onClick={() => {
        navigate("/")
        }}
    >
    Home
</button>
</form> 



        </div>
        
    </div>
    </>)
}