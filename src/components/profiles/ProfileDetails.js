import { useState, useEffect } from "react"

export const ProfileDetails = () => {
    const [ user, setUser] = useState([])

    const currentPurrfectUser = localStorage.getItem("purrfect_user")
    const purrfectUserObj = JSON.parse(currentPurrfectUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${purrfectUserObj.id}`)
                .then(response => response.json())
                .then((data) => {
                    setUser(data)
                })
        },
        [purrfectUserObj.id]
    )

    return <section className="flex flex-wrap p-44 justify-center">

            <div className="pr-3">
                <img className="border-4 border-purple-400 rounded-full shadow-md hover:shadow-xl"
                    src={user.imageUrl} 
                    alt={user.fullName} 
                    width="170px"
                />
            </div>
        
            <ul className="mt-6 pl-6 list-none">
                <li className="font-amatic text-5xl font-bold tracking-wider text-indigo-500 mb-3">
                    {user.fullName}
                </li>
                <li className="font-biz text-xl tracking-widest mb-2">
                    <b>Email</b>: {user.email} </li>
                <li className="font-biz text-lg tracking-wider">
                    <b>Adopted Fosters:</b> {user.adoptedId} </li>
            </ul>

    </section>
}