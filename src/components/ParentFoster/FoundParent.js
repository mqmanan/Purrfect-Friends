import { useEffect, useState } from "react"

export const FoundParents = ({ searchTermState }) => {
    const [parents, setParents] = useState([])
    const [filteredParents, setFilteredParents] = useState([])
          
    useEffect(
        () => {

            const searchedParents = parents.filter((parent) => {
                if(parent?.user?.fullName.toLowerCase().includes(searchTermState.toLowerCase()) 
            ) {
                return true
            }
        })
        setFilteredParents(searchedParents)
        
    },
        [searchTermState])

    useEffect(
        () => {
            fetch(`http://localhost:8088/fosterParents?_expand=user`)
                .then(response => {
                    return response.json()})
                .then((parentsArray) => {
                    const sortParents = [...parentsArray].sort((a, b) =>
                    a?.user?.fullName > b?.user?.fullName ? 1 : -1,)

                    setParents(sortParents)
                    return sortParents
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(() => {
        setFilteredParents(parents)
    },
    [parents]
    )

    return <>
   
        {/* <center><h2>✨ Looking for a candy? ✨</h2></center> */}
        <center>
            {
                filteredParents.map(
                    (parent) => {
                        return <div className="" key={parent.id}>

                            <div className="flex flex-row justify-center w-1/2 mb-3">
                        
                                    <div className="" >
                                        <img className="rounded-l-xl shadow-md" 
                                            src={parent?.user?.imageUrl}
                                            alt="fosterParent"
                                            width="190px" 
                                        />
                                    </div>
                                
                                    <div className="bg-gradient-to-r from-pink-200 to-purple-400 
                                        text-violet-900 font-extrabold text-center tracking-widest 
                                        rounded-r-xl shadow-md">
                                            <span className="block mt-4 ml-7 mr-7 text-4xl font-amatic
                                                text-violet-700">
                                                {parent?.user?.fullName}</span>
                                            <span className="block ml-7 mr-7 font-biz text-lg">
                                                {parent?.email}</span>
                                            <span className="block ml-7 mr-7 mb-4 font-biz text-lg">
                                                {parent.phoneNumber}</span>
                                    </div>

                            </div>
                        </div>
                    }
                    
                )

                
            }
        </center>

        <footer className="text-violet-100 font-biz text-xs text-center pt-2 pb-1">
            ⓒ Purrfect Friends 2022</footer>
    </>
}