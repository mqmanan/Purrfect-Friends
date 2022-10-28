import { useEffect, useState } from "react"
import { Foster } from "./Foster.js"

export const FosterList = () => {
    const [fosters, setFosters] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/fosters`)
                .then(response => {
                    return response.json()})
                .then((fosterArray) => {
                    setFosters(fosterArray)
                    return fosterArray
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
        
        <center><div className="title">✨ The Fosters ✨</div></center>
        <article className="fosters">
            {
                fosters.map((foster) => (
                    <Foster
                        key={foster.id}
                        id={foster.id}
                        name={foster.name}
                        imgsrc={foster.imageUrl}  
                    />
                ))
            }
        </article>
    </>
}

