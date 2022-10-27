import { useParams } from "react-router-dom"
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
        []
    )

    return <section className="profile">
        <center>
            <div className="userImage">
            <img 
                src={user.imageUrl} 
                alt={user.name} 
                className="user-img" 
                height="300px"
                width="350x"
            />
            </div>
        
            <div className="name">
                <u>{user.name}</u>
            </div>

            <div><b>Email:</b> {user.email}</div>
            <div><b>Adopted:</b> ~ empty ~</div>
       </center>

    </section>
}
