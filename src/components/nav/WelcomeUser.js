import { useState, useEffect } from "react"

export const WelcomeUser = () => {
    const [user, setUser] = useState([])

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

    return <section className="welcome">
        <center>
        
            <div className="name">
             ✧･ﾟ: *✧･ﾟ:* Welcome {user.fullName} *:･ﾟ✧*:･ﾟ✧
            </div>

       </center>

    </section>
}