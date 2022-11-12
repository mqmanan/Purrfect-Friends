import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Player } from '@lottiefiles/react-lottie-player'
// import PropTypes from 'prop-types'
// import lottie from 'lottie-web/build/player/lottie_light'
// import animationData from './animationData.json'


export const FilterFostersParents = () => {
    const [fosters, setFosters] = useState([])
    const [parents, setParents] = useState([])
    const [selectedParent, setSelectedParent] = useState(0)
    const [filteredFosters, setFilteredFosters] = useState([])

    // useState Hook returns 2 values (one is whatever data you give and the other is the function that allows you to update or change the data // state = data)
    // useEffect Hook tells React that your component needs to do something after render

    // this useEffect will fetch hogwarts houses data
    useEffect(
        () => {
                fetch(`http://localhost:8088/fosters`)
                .then(response => {
                    return response.json()})
                .then((fosterArray) => {
                    setFosters(fosterArray)
                    return fosterArray
                })

                fetch(`http://localhost:8088/fosterParents?_expand=user`)
                .then(response => {
                    return response.json()})
                .then((parentArray) => {
                    setParents(parentArray)
                    return parentArray
                })


        }, []) // When this array is empty, you are observing initial component state

        useEffect(() => {
            if (selectedParent === 0) {
                setFilteredFosters(fosters)
            } else {
                const parentFosters = fosters.filter((foster) => 
                    foster.fosterParentId === selectedParent)
                setFilteredFosters(parentFosters)
            }
        }, [selectedParent, fosters]) 
        //dependency array has 2 variables bc it needs to watch both states

        // const filterFostersMadame = () => {
        //     const resultsMadame = fostersAndParents.filter((fostersAndParent) => { 
        //         return fostersAndParent?.fosterParent?.nickName === "Madame F"
        //     })
        //     setFilteredFosters(resultsMadame)
        // }

        // const filterFostersFrankie = () => {
        //     const resultsFrankie = fostersAndParents.filter((fostersAndParent) => { 
        //         return fostersAndParent?.fosterParent?.nickName === "Frankarino"
        //     })
        //     setFilteredFosters(resultsFrankie)
        // }

        // const filterFostersHagrid = () => {
        //     const resultsHagrid = fostersAndParents.filter((fostersAndParent) => { 
        //         return fostersAndParent?.fosterParent?.nickName === "Hagrid"
        //     })
        //     setFilteredFosters(resultsHagrid)
        // }

    return <>
        
        <center>
        <div className="pl-12 bg-white">

                <Player
                    src='https://assets9.lottiefiles.com/packages/lf20_KMLXRr.json'
                    className="pt-10"
                    loop
                    autoplay
                    style={{ height: '230px', width: '230px' }}
                />

            <div className="block mt-3">

                <select className="w-72 border-violet-300 rounded-lg bg-purple-100
                    focus:outline-none border-2 focus:border-violet-700 shadow-md
                    hover:bg-violet-200 font-biz text-sm tracking-wide font-bold mt-3"
                    required
                    id = "fosterParent"
                    onChange={(event) => {
                        setSelectedParent(parseInt(event.target.value))
                    }}
                >
                    <option key="0" value="0">✦ Select Foster Parent ✦</option>

                    {parents.map((parent) => {
                        return <option key={parent.id} value={parent.id} 
                        className="tracking-widest font-bold">
                            {parent.nickName}</option>
                        }
                    )}
                </select>

            </div>

        </div>
        </center>

        <div className="flex flex-wrap place-content-center pl-24 pr-10 pt-3 pb-4 bg-white">
            {
                filteredFosters.map(
                    (foster) => {
                        return <div className="hover:animate-tilt mt-6" key={foster.id}>

                            <div className="items-start justify-center px-16 pt-9 pb-2">

                            <div className="relative group">
                                <button className="absolute -inset-1 rounded-xl blur opacity-50 
                                bg-gradient-to-r from-indigo-700 to-purple-500 group-hover:opacity-100 
                                transition duration-1000 group-hover:duration-300 animate-tilt">
                                </button>
                        
                                    <div className="relative" key={foster.id}>
                                        <Link to={`/fosters/${foster.id}`} >
                                        <img className="rounded-t-xl" 
                                            src={foster.imageUrl}
                                            alt="foster"
                                            width="220px" 
                                        />
                                        </Link>
                                
                                    <div className="relative bg-white text-purple-700 font-extrabold 
                                        text-center font-amatic text-3xl tracking-widest 
                                        rounded-b-xl">
                                        <Link to={`/fosters/${foster.id}`} >
                                            {foster.name}
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                        </div>
                    }
                )
            }
        </div>

        <footer className="text-gray-100 font-biz text-xs text-center pt-2 pb-11 bg-white">
            ⓒ Purrfect Friends 2022</footer>
    </>
}