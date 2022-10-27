import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export const FosterDetails = () => {
    const { fosterId } = useParams()
    const [ foster, setFoster ] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/fosters/${fosterId}`)
                .then(response => response.json())
                .then((data) => {
                    setFoster(data)
                })
        },
        [ fosterId]
    )

    return <section className="Foster">
        <center>
            <div className="fosterImage">
            <img 
                src={foster.imageUrl} 
                alt={foster.name} 
                className="item-img" 
                height="300px"
                width="350x"
            />
            </div>
        
        
            <div className="name">
                <u>{foster.name}</u>
            </div>

            <div><b>Birthday:</b> {foster.dob}</div>
            <div><b>Description:</b> {foster.description}</div>
            <div><b>Fixed:</b> {foster.spayedNeutered}</div>
       </center>

    </section>
}
