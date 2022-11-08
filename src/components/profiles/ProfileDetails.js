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
                <li className="font-amatic text-5xl font-bold tracking-wider text-violet-500">
                    {user.fullName}
                </li>
                <li className="mt-2 font-amatic text-4xl tracking-widest hover:list-disc">
                    <b>Email</b>: {user.email} </li>
                <li className="font-amatic text-2xl tracking-wider hover:list-square">
                    <b>Adopted Fosters:</b> {user.adoptedId} </li>
            </ul>

    </section>
}