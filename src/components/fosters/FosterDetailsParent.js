import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"

export const FosterDetailsParent = () => {
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
        [fosterId]
    )

    return <>
    
        <section className="Foster">
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

                <div>
                <Link to={`/fosters/${foster.id}/edit`}>{foster.name}</Link>
                </div>

                <div><b>Birthday:</b> {foster.dob}</div>
                <div><b>Description:</b> {foster.description}</div>
                <div><b>FVRCP Vaccine *1/3:</b> {foster.fvrcpVaccine1}</div>
                <div><b>FVRCP Vaccine *2/3:</b> {foster.fvrcpVaccine2}</div>
                <div><b>FVRCP Vaccine *3/3:</b> {foster.fvrcpVaccine3}</div>
                <div><b>FeLV Vaccine:</b> {foster.felvVaccine}</div>
                <div><b>Rabies Vaccine:</b> {foster.rabies}</div>
                <div><b>Fixed:</b> {foster.spayedNeutered}</div>
            </center>
        </section>

    </>
}
