import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Player } from '@lottiefiles/react-lottie-player'
// import PropTypes from 'prop-types'
// import lottie from 'lottie-web/build/player/lottie_light'
// import animationData from './animationData.json'


export const FilterFostersParents = () => {
    const [fosters, setFosters] = useState([])
    const [fosterAges, setFosterAges] = useState([])
    const [fosterHouses, setFosterHouses] = useState([])
    const [filteredFosters, setFilteredFosters] = useState([])

    // useState Hook returns 2 values (one is whatever data you give and the other is the function that allows you to update or change the data // state = data)
    // useEffect Hook tells React that your component needs to do something after render

    // this useEffect will fetch hogwarts houses data
    useEffect(
        () => {
            fetch(`http://localhost:8088/fosters?_expand=hogwartHouse`)
                .then(response => {
                    return response.json()})
                .then((hogwartsArray) => {
                    setFosterHouses(hogwartsArray)
                    return hogwartsArray
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/fosters?_expand=ageRange`)
                .then(response => {
                    return response.json()})
                .then((ageArray) => {
                    setFosterAges(ageArray)
                    return ageArray
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/fosters?_expand=fosterParent`)
                .then(response => {
                    return response.json()})
                .then((fosterArray) => {
                    setFosters(fosterArray)
                    return fosterArray
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(() => {
        setFilteredFosters(fosters)
    },
    [fosters]
    )

    //filter functions
    const filterFostersKitten = () => {
        const resultsKitten = fosterAges.filter((fosterAge) => { 
            return fosterAge?.ageRange?.name === "Kitten"
        })
        console.log(resultsKitten)
        setFilteredFosters(resultsKitten)
    }

    const filterFostersYoung = () => {
        const resultsYoung = fosterAges.filter((fosterAge) => { 
            return fosterAge?.ageRange?.name === "Young Adult"
        })
        setFilteredFosters(resultsYoung)
    }

    const filterFostersGryffinclaw = () => {
        const resultsGryffinclaw = fosterHouses.filter((fosterHouse) => { 
            return fosterHouse?.hogwartHouse?.name === "Gryffinclaw"
        })
        setFilteredFosters(resultsGryffinclaw)
    }

    const filterFostersHufflepuss = () => {
        const resultsHufflepuss = fosterHouses.filter((fosterHouse) => { 
            return fosterHouse?.hogwartHouse?.name === "Hufflepuss"
        })
        setFilteredFosters(resultsHufflepuss)
    }

    const filterFostersSnifferin = () => {
        const resultsSnifferin = fosterHouses.filter((fosterHouse) => { 
            return fosterHouse?.hogwartHouse?.name === "Snifferin"
        })
        setFilteredFosters(resultsSnifferin)
    }

    const filterFostersRavenpaw = () => {
        const resultsRavenpaw = fosterHouses.filter((fosterHouse) => { 
            return fosterHouse?.hogwartHouse?.name === "Ravenpaw"
        })
        setFilteredFosters(resultsRavenpaw)
    }

    const getAllFosters = () => {
        fetch(`http://localhost:8088/fosters?_expand=hogwartHouse`)
        .then(response => {
            return response.json()})
        .then((fostersArray) => {
            setFosters(fostersArray)
            return fostersArray
        })
    }

    const filterFostersMadame = () => {
        const resultsMadame = fosters.filter((foster) => { 
            return foster?.fosterParent?.nickName === "Madame F"
        })
        setFilteredFosters(resultsMadame)
    }

    const filterFostersFrankie = () => {
        const resultsFrankie = fosters.filter((foster) => { 
            return foster?.fosterParent?.nickName === "Frankarino"
        })
        setFilteredFosters(resultsFrankie)
    }

    const filterFostersHagrid = () => {
        const resultsHagrid = fosters.filter((foster) => { 
            return foster?.fosterParent?.nickName === "Hagrid"
        })
        setFilteredFosters(resultsHagrid)
    }

    return <>
        
        <center>
        <div className="pl-12 bg-white">

                <Player
                    src='https://assets1.lottiefiles.com/packages/lf20_ZBTZ9Ris1z.json'
                    className=""
                    loop
                    autoplay
                    style={{ height: '230px', width: '230px' }}
                />
            

            <button 
                className="bg-violet-500 px-2 py-1 text-white rounded-xl font-amatic text-xl 
                font-extrabold tracking-widest mr-3 ml-1 hover:animate-bounce hover:bg-gradient-to-r from-pink-400 to-purple-500 focus:outline-none focus:ring focus:ring-pink-600"
                onClick={() => { filterFostersKitten() }}
            >
            Kittens
            </button>

            <button 
                className="bg-violet-500 px-2 py-1 text-white rounded-xl font-amatic text-xl 
                font-extrabold tracking-widest mr-5 ml-1 hover:animate-bounce hover:bg-gradient-to-r from-pink-400 to-purple-500 focus:outline-none focus:ring focus:ring-pink-600"
                onClick={() => { filterFostersYoung() }}
            >
            Young Adults
            </button> 

            <span className="text-3xl">🐾</span>

            <button 
                className="bg-violet-500 px-2 py-1 text-white rounded-xl font-amatic text-xl 
                font-extrabold hover:text-yellow-300 tracking-widest mr-3 ml-5 hover:animate-bounce hover:bg-gradient-to-r from-red-500 to-red-600 focus:outline-none focus:ring 
                focus:ring-yellow-300"
                onClick={() => { filterFostersGryffinclaw() }}
            >
            Gryffinclaw
            </button>

            <button 
                className="bg-violet-500 px-2 py-1 text-white rounded-xl font-amatic text-xl 
                font-extrabold hover:text-slate-300 tracking-widest mr-3 ml-1 hover:animate-bounce hover:bg-gradient-to-r from-green-500 to-green-700 focus:outline-none focus:ring focus:ring-slate-600"
                onClick={() => { filterFostersSnifferin() }}
            >
            Snifferin
            </button>

            <button 
                className="bg-violet-500 px-2 py-1 text-white rounded-xl font-amatic text-xl 
                font-extrabold hover:text-black tracking-widest mr-3 ml-1 hover:animate-bounce hover:bg-gradient-to-r from-yellow-300 to-yellow-500 focus:outline-none focus:ring focus:ring-black"
                onClick={() => { filterFostersHufflepuss() }}
            >
            Hufflepuss
            </button>

            <button 
                className="bg-violet-500 px-2 py-1 text-white rounded-xl font-amatic text-xl 
                font-extrabold hover:text-amber-500 tracking-widest mr-3 ml-1 hover:animate-bounce hover:bg-gradient-to-r from-blue-500 to-blue-600 focus:outline-none focus:ring focus:ring-amber-500"
                onClick={() => { 
                    filterFostersRavenpaw() 
                }} 
            >
            Ravenpaw
            </button>

            <div className="block mt-3">
            <button 
                className="bg-violet-500 px-3 py-1 text-white rounded-xl font-amatic text-xl 
                font-extrabold tracking-widest mr-3 ml-1 hover:animate-bounce hover:bg-gradient-to-r from-green-600 to-red-500 focus:outline-none focus:ring focus:ring-green-600"
                onClick={() => { filterFostersMadame() }}
            >
            Madame F
            </button>

            <button 
                className=" bg-violet-500 px-3 py-1 text-white rounded-xl font-amatic text-xl font-extrabold tracking-widest mr-3 ml-1 hover:animate-bounce hover:bg-gradient-to-r from-red-500 to-green-600 focus:outline-none focus:ring focus:ring-red-500"
                onClick={() => { filterFostersFrankie() }}
            >
            Frankarino
            </button>

            <button 
                className=" bg-violet-500 px-3 py-1 text-white rounded-xl font-amatic text-xl font-extrabold tracking-widest mr-5 ml-1 hover:animate-bounce hover:text-black
                hover:bg-gradient-to-r from-amber-500 to-amber-800 focus:outline-none focus:ring focus:ring-amber-700"
                onClick={() => { filterFostersHagrid() }}
            >
            Hagrid
            </button>

            <span className="text-3xl">🐾</span>

            <button 
                className="bg-violet-500 px-3 py-1 text-white rounded-xl font-amatic text-xl 
                font-extrabold tracking-widest mr-5 ml-3 hover:animate-bounce hover:bg-gradient-to-r from-pink-400 to-purple-500 focus:outline-none focus:ring focus:ring-pink-600"
                onClick={() => { getAllFosters() }}
            >
            All
            </button>
            </div>

        </div>
        </center>

        <div className="flex flex-wrap place-content-center pl-24 pr-10 pb-2 pt-1 bg-white">
            {
                filteredFosters.map(
                    (foster) => {
                        return <div className="hover:animate-tilt mt-6" key={foster.id}>

                            <div className="items-start justify-center px-16 pt-11 pb-5">

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

        <footer className="text-violet-100 font-biz text-xs text-center pt-3 pb-2 bg-white">
            ⓒ Purrfect Friends 2022</footer>


    </>
}