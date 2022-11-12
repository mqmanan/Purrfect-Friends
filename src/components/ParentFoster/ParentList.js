import { useEffect, useState } from "react"
// import { FosterstoParent } from "../ParentFoster/FostersToParents"

export const ParentList = () => {
    const [ fosterParents, setFosterParents ] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/fosterParents?_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    setFosterParents(data)
                    return data
                })
        },
    [])

    // const userFosterParent = fosterParents.find(fosterParent => fosterParent.userId === purrfectUserObj.id)

    // const fostersToParentFilter = () => {
    //     const results = parentToFosters.filter((parentToFoster) => { 
    //         if (parentToFoster.fosterParentId === userFosterParent.id)
    //         return parentToFoster.name
    //     })
    //     setParentsToFosters(results)
    //     console.log(results)
    // }

    // passing down PROPS in here
    return <>
      
      <center>
        {/* <div className="pl-11 justify-center">
            <Player
                src='https://assets1.lottiefiles.com/packages/lf20_ueIPoNUkNO.json'
                className=""
                loop
                autoplay
                style={{ height: '300px', width: '300px' }}
            />
        </div> */}

        <div className="text-5xl text-violet-900 text-center tracking-widest mt-6 mb-9 pl-5
            font-amatic font-extrabold bg-violet-400">
            Purrfect Friends' Network of Foster Parents
        </div>

        {/* <button className="bg-violet-300 rounded-xl text-white py-2 px-4 mb-8
                        font-amatic text-2xl hover:tracking-widest font-extrabold 
                        hover:bg-gradient-to-r from-pink-500 to-purple-500 hover:animate-tilt"
                        type="submit"
                        onClick={(event) => {
                        navigate("/profile/fostersParents")
                        }}
                    >
                    foster-Parent List
                </button> */}


        <div className="flex flex-col justify-center">
            {
                fosterParents.map(
                    (fosterParent) => {

                        return <div className="mb-4" key={fosterParent.id}>

                            <div className="flex flex-row w-1/2 justify-center">
                        
                                    <div className="userImg" >
                                        <img className="rounded-l-xl shadow-md" 
                                            src={fosterParent?.user?.imageUrl}
                                            alt="fosterParent"
                                            width="185px" 
                                        />
                                    </div>
                                
                                    <div className="bg-gradient-to-r from-pink-200 to-purple-400 
                                        text-violet-900 font-extrabold text-center tracking-widest 
                                        rounded-r-xl shadow-md">
                                            <span className="block mt-4 ml-7 mr-7 text-4xl font-amatic
                                                text-violet-700">
                                                {fosterParent?.user?.fullName}</span>
                                            <span className="block ml-7 mr-7 font-biz text-lg">
                                                {fosterParent?.email}</span>
                                            <span className="block ml-7 mr-7 mb-4 font-biz text-lg">
                                                {fosterParent.phoneNumber}</span>
                                    </div>

                            </div>
                        </div>
                        
                    }
                )

            }
        </div>
        </center>
    </>
}