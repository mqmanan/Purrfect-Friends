import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        adoptedId: 0,
        isStaff: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("purrfect_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists!")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main className="container--login text-2xl">
            <section className="bg-violet-200 min-h-screen flex items-center justify-center">

            <form className="bg-violet-300 flex rounded-2xl shadow-lg max-w-3xl p-3" 
            onSubmit={handleRegister}>

                <div className="w-1/2">
                    <img className="rounded-2xl"
                    src="http://mgprograms.org/wp-content/uploads/2013/09/purrfectlogo.PNG" 
                    alt="cats" />
                </div>

                <div className='w-1/2 px-5'>
                    <div className="font-bold font-amatic text-violet-900 mt-6 text-center text-5xl">
                     Sign Up </div> 

                    <fieldset className="flex flex-col gap-3 mt-4 font-biz text-xl">
                        <input className="p-2 mt-3 rounded-lg border border-violet-400 focus:outline-none focus:border-violet-900 tracking-wider"
                               onChange={updateCustomer}
                               type="text" id="fullName" 
                               placeholder="Enter Your Name" required />
                    </fieldset>
                
                    <fieldset className="flex flex-col gap-3 mt-2 font-biz text-xl">
                        <input className="p-2 mt-1 rounded-lg border border-violet-400 focus:outline-none focus:border-violet-900 tracking-wider"
                               onChange={updateCustomer}
                               type="email" id="email"
                               placeholder="Enter Email Address" required />
                    </fieldset>
                
                    <fieldset className="py-2 px-2 mt-2">
                        <input onChange={(evt) => {
                               const copy = {...customer}
                               copy.isStaff = evt.target.checked
                               setCustomer(copy)
                            }}
                        type="checkbox" id="isStaff" />
                        <label className="text-violet font-amatic py-2 px-2 font-bold text-md tracking-wider" htmlFor="email"> 
                            I am a Foster Parent 🐈‍⬛ </label>
                    </fieldset>
                
                    <fieldset>
                    <button className="bg-violet-900 rounded-xl text-white font-amatic py-2 px-4 mt-3 text-2xl
                            hover:bg-indigo-400 tracking-wider"
                            type="submit">
                            Register </button>
                    </fieldset>
            
                </div>
            </form></section>
        </main>
    )
}