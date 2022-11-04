import { useState, useEffect } from "react"

export const WelcomeUser = () => {
    const [user, setUser] = useState([])

    const currentPurrfectUser = localStorage.getItem("purrfect_user")
    const purrfectUserObj = JSON.parse(currentPurrfectUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${purrfectUserObj.id}`)
                .then(response => response.json())
                .then((data) => {
                    setUser(data)
                })
        },
        []
    )

    return <section className="mt-8 p-5">

        <center>
            <div className="">

                <div className="grid gap-8 items-start justify-center mb-7">
                    <div className="relative group">
                        <button className="absolute -inset-1 bg-gradient-to-r from-purple-900 to-indigo-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></button>

                        <button className="relative px-7 py-4 bg-purple-300 rounded-lg leading-none 
                        flex items-center">

                        <span className="flex items-center space-x-5">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 -rotate-45 text-indigo-700">
                                <path 
                                    fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" 
                                />
                            </svg>
                        </span>

                        <span className="pr-1 pl-3 text-indigo-700 font-bold font-amatic 
                            text-4xl tracking-wider">Welcome to Purrfect Friends</span>

                        <span className="pr-3 pl-1 text-violet-500 group-hover:text-white
                            transition duration-200 font-bold font-amatic text-3xl tracking-wider">
                    
                            <a href="http://localhost:3000/profile">{user.fullName}</a>
                         
                        </span>

                        <span className="flex items-center space-x-5">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 -rotate-6 text-indigo-700">
                                <path 
                                    fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" 
                                />
                            </svg>
                        </span>
                        
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap place-content-evenly">

                    <div className="mt-10">
                    <img className="border-dashed border-4 border-teal-400 rounded-xl shadow-lg 
                     hover:shadow-emerald-700"
                            src="https://www.goodmews.org/wp-content/uploads/donate-3.png" 
                            alt="donate"
                            width="310" />
                    </div>

                    <div className="mt-10">
                    <img className="border-dashed border-4 border-pink-400 rounded-xl 
                    shadow-lg hover:shadow-pink-900"
                            src="https://www.goodmews.org/wp-content/uploads/adopt-3.png" 
                            alt="adopt"
                            width="310" />
                    </div>

                </div>
                
                <div className="flex flex-wrap place-content-evenly">

                    {/* <div className="text-3xl">
                        <span>your support saves lives</span> 
                        <span>-- With your support, we can continue finding good homes for good kitties. See the many ways you can help.</span>          
                    </div> */}
                
                    {/* <div className="text-3xl">
                    <span>adopt a forever friend </span>--  
                    <span>Our adoption counselors are experienced matchmakers, ready to help you find your lifelong companion.  </span>            
                    </div> */}

                    {/* <div className="text-3xl">
                    <span>come play with us</span> --
                    <span>Being a volunteer is rewarding. You could have a meaningful impact on an animal who has never known love.  </span>           
                    </div> */}
                </div>

            
            </div>
        </center>
    </section>
}
