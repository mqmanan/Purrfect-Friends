import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const FosterList = () => {
    const [fosters, setFosters] = useState([])
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate()

	const currentPurrfectUser = localStorage.getItem("purrfect_user")
    const purrfectUserObj = JSON.parse(currentPurrfectUser)

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

    // useEffect(
    //     () => {
    //         if (toggle) {
    //             let priceyProducts= products.filter(product => product.price >= 10)
    //             setProducts(priceyProducts)

    //         } else {
    //             setProducts(products)

    //         }
    //     },
    //     [toggle] // watching value to change
    // )

    return <>
        {/* {
            kandyUserObj.staff 
            ? ( <> 
                    <center><button className="filter-button" onClick={() => { setToggle(!toggle) }}>
                        {toggle ? "🍭 All Candy 🍭" : "🍭 Expensive Candy 🍭"}
                    </button></center>
                </> ) 
            : ("")     
        } */}
        
        <center><h2>✨ The Fosters ✨</h2></center>
        <article className="fosters">
            {
                fosters.map(
                    (foster) => {
                        return <div className="foster" key={foster.id}>
                                <img 
                                    src={foster.imageUrl} 
                                    alt={foster.name} 
                                    className="item-img" 
                                    height="300px"
                                    width="350x"
                                />

                                <div className="item-details">
                                    <b>{foster.name}</b><br></br><br></br>
                                </div>
                            </div>
                    }
                )
            }
        </article>
    </>
}

