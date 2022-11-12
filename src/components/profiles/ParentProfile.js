import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ParentProfile = () => {
    const [ fosterParent, setFosterParent ] = useState([])
    // const [ parentToFosters, setParentsToFosters ] = useState([])
    const navigate = useNavigate()
    // const { purrfectUserId } = useParams()

    const currentPurrfectUser = localStorage.getItem("purrfect_user")
    const purrfectUserObj = JSON.parse(currentPurrfectUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/fosterParents?_expand=user&userId=${purrfectUserObj.id}`)
                .then(response => response.json())
                .then((data) => {
                    const userObj = data[0]
                    setFosterParent(userObj)
                })
        },
    [purrfectUserObj.id])

    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8088/fosters?_expand=fosterParent`)
    //             .then(response => {
    //                 return response.json()})
    //             .then((fostersToParentArray) => {
    //                 setParentsToFosters(fostersToParentArray)
    //                 return fostersToParentArray
    //             })
    //     },
    //     [] // When this array is empty, you are observing initial component state
    // )

    // const userFosterParent = purrfectUserObj.find(
    //     purrfectUserObj => purrfectUserObj.userId === purrfectUserObj.id)

    // const fostersToParentFilter = () => {
    //     const results = parentToFosters.filter((parentToFoster) => { 
    //         if (parentToFoster.fosterParentId === userFosterParent.id)
    //         return parentToFoster.name
    //     })
    //     setParentsToFosters(results)
    //     console.log(results)
    // }

    return (
        <section className="flex flex-wrap p-40 justify-center">

            <div className="mt-8 pr-2">
                    <img className="border-4 border-dotted border-indigo-500 rounded-full shadow-md hover:shadow-xl"
                        src={fosterParent?.user?.imageUrl} 
                        alt={fosterParent?.user?.fullName} 
                        width="180px"
                    />
            </div>

            <ul className="mt-5 pl-7 list-none">
                <li className="font-amatic text-5xl font-extrabold tracking-widest text-indigo-500 mb-3">
                    {fosterParent?.user?.fullName}
                </li>
                <li className="mt-2 font-biz text-xl tracking-widest mb-2">
                    <b>Nickname:</b> {fosterParent.nickName} </li>
                <li className="mt-2 font-biz text-xl tracking-widest mb-2">
                    <b>E-mail:</b> {fosterParent.email} </li>
                <li className="font-biz text-xl tracking-widest mb-2">
                    <b>Phone Number:</b> {fosterParent.phoneNumber} </li>
                <li className="font-biz text-lg tracking-wider mb-2">
                    <b>Start Date:</b> {fosterParent.startDate} </li>
                <li className="font-biz text-lg tracking-wider mb-5">
                    <b>Adopted Fosters:</b> {fosterParent?.user?.adoptedId} </li>

                <button className="bg-violet-300 rounded-xl text-white py-2 px-4 mt-2 mr-2 font-amatic 
                        text-2xl font-extrabold hover:bg-gradient-to-r from-pink-500 to-purple-500
                        hover:animate-bounce"
                        type="submit"
                        onClick={() => {
                        navigate(`/profile/${purrfectUserObj.id}`)
                        }}
                    >
                    Edit Profile
                </button>

                {/* <button 
                    className="bg-violet-300 rounded-xl text-white py-2 px-4 mt-2
                    font-amatic text-2xl font-extrabold hover:bg-gradient-to-r from-pink-500 to-purple-500
                    hover:animate-bounce"
                    onClick={() => { fostersToParentFilter() }}
                >
                ✧ My Fosters ✧
                </button> */}

            </ul>

        </section>
    )
}