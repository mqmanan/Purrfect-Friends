import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ParentProfile = () => {
    const [ fosterParent, setFosterParent ] = useState([])
    const navigate = useNavigate()

    const currentPurrfectUser = localStorage.getItem("purrfect_user")
    const purrfectUserObj = JSON.parse(currentPurrfectUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/fosterParents?_expand=user&userId=${purrfectUserObj.id}`)
                .then(response => response.json())
                .then((data) => {
                    const userObj = data[0]
                    setFosterParent(userObj)
                })
        },
    [purrfectUserObj.id])

    return (
        <section className="flex flex-wrap p-44 justify-center">

            <div className="mt-5 pr-3">
                    <img className="border-4 border-purple-400 rounded-full shadow-md hover:shadow-xl"
                        src={fosterParent?.user?.imageUrl} 
                        alt={fosterParent?.user?.fullName} 
                        width="170px"
                    />
            </div>

            <ul className="mt-10 pl-6 list-none">
                <li className="font-amatic text-5xl font-bold tracking-wider">
                    {fosterParent?.user?.fullName}
                </li>
                <li className="mt-2 font-amatic text-3xl tracking-widest">
                    <b>Email:</b> {fosterParent?.user?.email} </li>
                <li className="font-amatic text-3xl tracking-widest">
                    <b>Phone Number:</b> {fosterParent.phoneNumber} </li>
                <li className="font-amatic text-2xl tracking-wider">
                    <b>Start Date:</b> {fosterParent.startDate} </li>
                <li className="font-amatic text-2xl tracking-wider">
                    <b>Adopted Fosters:</b> {fosterParent?.user?.adoptedId} </li>

                <button className="bg-violet-300 rounded-xl text-black py-1 px-3 mt-5 font-amatic text-xl
                        hover:bg-pink-500 hover:tracking-widest hover:font-bold hover:text-white 
                        font-bold tracking-wider"
                        type="submit"
                        onClick={() => {
                            navigate("/profile/edit")
                        }}
                    >
                    Edit Profile
                </button>
            </ul>

        </section>
    )
}