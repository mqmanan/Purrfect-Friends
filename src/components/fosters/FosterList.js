import { useEffect, useState } from "react"
import { Foster } from "./Foster.js"

export const FosterList = () => {
    const [fosters, setFosters] = useState([])

    // useState Hook returns 2 values (one is whatever data you give and the other is the function that allows you to update or change the data // state = data)
    // useEffect Hook tells React that your component needs to do something after render

    // this useEffect will fetch fosters data from API
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

    // passing down PROPS in here

    return <>
        
        <center><div className="pl-8 bg-white">
                <img
                src="https://c.bonfireassets.com/static/stores/e47b/8060/22e8-4839-99ea-7452ba6f8e69/uploads/7e0ff6b0-f19a-4422-87c7-191d4a1b9b25.jpg" width="250" />
            </div></center>

        <div className="flex flex-wrap place-content-evenly pl-9 pr-2 mb-0 bg-white">
            {
                fosters.map(
                    (foster) => (<Foster
                        key={foster.id}
                        foster={foster}
                        id={foster.id}
                    />
                ))
            }
        </div>
    </>
}

