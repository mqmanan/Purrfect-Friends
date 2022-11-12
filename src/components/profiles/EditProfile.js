import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditProfile = () => {
    const { fosterParentId } = useParams()
    
    const navigate = useNavigate()

    const [ fosterParent, updateFosterParent ] = useState({
        phoneNumber: "",
        email: ""
    })
    
    // const [ userParent, updateUserParent ] = useState({
    //     fullName: "",
    //     email: ""
    // })

    // this gets specific info from API & updates state
    useEffect(
        () => {
            fetch(`http://localhost:8088/fosterParents?_expand=user&userId=${fosterParentId}`)
                .then(response => response.json())
                .then((data) => {
                    const userObj = data[0]
                    updateFosterParent(userObj)
                })
        },
    [fosterParentId])

    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8088/users/${purrfectUserObj.id}`)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 updateUserParent(data)
    //             })
    //     },
    // [purrfectUserObj.id])


    const handleInputChange = (event) => {
        const copy = { ...fosterParent }
        copy[event.target.id] = event.target.value
        updateFosterParent(copy)
    }


    // function that will PUT updated data into the API and then navigate to fosters page when done
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/fosterParents/${fosterParent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fosterParent)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/profile")
            })
    }

    return <>

    <div className="flex flex-col items-center my-16">
        <img className="border-4 border-dotted border-purple-400 rounded-full 
            shadow-md hover:shadow-xl mb-4 mt-4"
             src={fosterParent?.user?.imageUrl} 
             alt="user-img"
             style={{ height: '200px', width: '200px' }}
        />

        <form className="w-1/3 font-biz space-y-2 ml-5">
            
            <fieldset>
                <div className="">
                    <label htmlFor="name" className="font-bold text-lg ml-1">
                        Nickname:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded-xl focus:outline-none focus:border-violet-400"
                        required
                        autoFocus
                        id="nickName"
                        type="text"
                        value={fosterParent.nickName}
                        onChange={handleInputChange}
                        /> 
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="imageUrl" className="font-bold text-lg ml-1">
                        Email:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded-2xl focus:outline-none focus:border-violet-400"
                        required
                        id="email"
                        type="text"
                        value={fosterParent.email}
                        onChange={handleInputChange} 
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form">
                    <label htmlFor="fixed" className="font-bold text-lg ml-1">
                        Phone Number:</label>
                    <input className="border border-slate-300 block w-full py-1 px-2 rounded-2xl mb-3
                        focus:outline-none focus:border-violet-400"
                        required
                        id="phoneNumber"
                        type="text"
                        value={fosterParent.phoneNumber}
                        onChange={handleInputChange}
                        />
                </div>
            </fieldset>

            <button 
                className="bg-violet-300 px-2 py-1 text-black rounded-xl font-amatic text-xl 
                   font-extrabold hover:bg-gradient-to-r from-pink-500 to-purple-500
                   hover:animate-tilt hover:text-white tracking-wider"
                onClick={(event) => {
                    handleSaveButtonClick(event)
                }}
            >
            Update
            </button>
        
        </form>
        </div>
    </>
}