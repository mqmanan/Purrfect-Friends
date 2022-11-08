import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("purrfect_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    })) //converts JSON data to JavaScript data

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login text-2xl">
            <section className="bg-violet-200 min-h-screen flex items-center justify-center">

                <form className="bg-violet-300 flex rounded-2xl shadow-lg max-w-3xl p-3" 
                    onSubmit={handleLogin}>

                    <div className="w-1/2">
                        <img className="rounded-2xl"
                        src="http://mgprograms.org/wp-content/uploads/2013/09/purrfectlogo.PNG" 
                        alt="cats" />
                    </div>

                    <div className='w-1/2 px-3'>
                    <div className="font-bold font-amatic text-6xl text-violet-900 mt-10 p-1">
                        Welcome</div> 

                    <fieldset className="flex flex-col font-biz gap-3 mt-8 text-lg">
                        <input className="p-2 mt-3 rounded-lg border border-gray-400 focus:outline-none focus:border-violet-900 tracking-wider"
                            type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            placeholder="Enter Email Address"
                            required />
                    </fieldset>

                    <fieldset>
                        <button className="rounded-xl font-bold text-black bg-indigo-400 border py-1 px-3 mt-2 text-2xl
                                hover:bg-indigo-300 hover:text-black font-amatic"
                            type="submit">
                            Sign In
                        </button>
                    </fieldset>

                    <section className="hover:text-indigo-500 hover:text-2xl hover:tracking-widest
                            py-2 px-1 mt-10 tracking-wide text-xl font-bold font-amatic">
                        <Link to="/register">Not a member yet?</Link>
                    </section>

                    </div>
                </form>
            </section>
        </main>
    )
}

