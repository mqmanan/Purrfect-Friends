import { useState, useEffect } from "react"
// import { sunset } from "../animate/sunset.jpg"
import { Link } from "react-router-dom"
import { Player } from '@lottiefiles/react-lottie-player'

export const WelcomeUser = () => {

    // let sunset = require("../animate/sunset.jpg")

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
        [purrfectUserObj.id]
    )

    return <section className="flex flex-wrap pl-16">

        {/* <img src={sunset} alt="Kitty" width="" /> */}

        <div className="bg-gradient-to-tr from-violet-400 to-indigo-900 w-full h-96 
            shadow-lg mb-5">
            <img src='https://images.pexels.com/photos/9783913/pexels-photo-9783913.jpeg?auto=compress&         cs=tinysrgb&w=1260&h=750&dpr=1'
            alt="catbanner"
                 className="w-full h-96 object-cover static mix-blend-overlay" />
            <div className="p-16 absolute -right-4 top-1">
                <span className="block font-bold text-8xl text-white
                    font-amatic text-right">
                    Purrfect Friends</span>
                <span className="block mb-7 text-3xl text-white tracking-wide 
                    font-amatic text-right">
                    Find the <b>Yin</b> to your <b>Yang</b> ☯ <Link className="hover:underline hover:underline-offset-8 text-pink-500 font-bold" 
                        to={`/profile`} > {user.fullName}</Link></span>
                <span className="block text-xl text-white tracking-wider
                    font-amatic text-right">
                    Currently servicing the CSRA community of Augusta, GA </span>
            </div>
        </div>

                <div className="flex">

                    <div className="absolute left-28 top-72 w-1/3 tracking-wide ml-5 mr-2 
                        pb-10">
                        <span className="absolute -left-0 bg-white p-3 rounded-t-2xl font-amatic text-4xl 
                            font-extrabold w-full">
                        your support saves lives</span> 
                        <span className="block bg-violet-300 pt-6 pb-4 rounded-t-2xl">
                            <Player
                            src='https://assets3.lottiefiles.com/packages/lf20_dopee6e0.json'
                                className="opacity-90"
                                loop
                                autoplay
                                style={{ height: '400px', width: '450px' }}
                            />
                        </span>    
                        <span className="block bg-violet-300 px-7 pb-5 -mt-16 font-biz text-lg text-justify">
                            <b>There are so many</b> loving adoptable pets right in your community waiting for a family to call their own.</span>   
                  
                        <span className="block bg-violet-300 px-7 pb-5 rounded-b-2xl font-biz text-lg text-justify text-wrap">
                            <img className="relative float-left pr-4 -mt-2 rounded-full opacity-70 blur-md"
                                src="https://prd-use1-shelter-app.s3.amazonaws.com/wfeqqqpsim.png" 
                                alt="non-profit"
                                width="220"
                                />
                            <a href="https://thatswhatfriendsarefor.org/" 
                                className="hover:mix-blend-luminosity">
                            <img className=" absolute float-left pl-2 pr-4 rounded-full opacity-80 mix-blend-overlay"
                                src="https://prd-use1-shelter-app.s3.amazonaws.com/wfeqqqpsim.png" 
                                alt="non-profit"
                                width="217"
                                /></a>
                                
                                <b>If you need financial assistance</b>, we currently work with a local non-profit group -- <b><a href="https://thatswhatfriendsarefor.org/" className="hover:bg-pink-200">That's What Friends Are For, Inc</a></b>. They can <b>assist</b> with funds for the necessary (initial) vet appointments for a <b>donation</b> fee of $75. Contact us for more details.
                                </span>    
                            
                    </div>

                    <div className="absolute right-20 top-80 w-1/2 border-violet-700 rounded-xl 
                                    text-xl font-biz tracking-wide ml-2 mr-5 pb-5">
                        <span className="relative block bg-white p-3 rounded-t-2xl font-amatic text-4xl font-extrabold">
                        🎁 A Purrfect Friend for the Holidays 🎁</span>  
                        <span className="block bg-violet-300 p-10 items-center rounded-b-2xl">
                            <Player
                            src='https://assets8.lottiefiles.com/packages/lf20_uultxlbm.json'
                                className="opacity-20"
                                loop
                                autoplay
                                style={{ height: '550px', width: '510px' }}
                            />
                        </span>   
                        <span className="absolute top-28 block px-8 pb-3 font-biz text-lg text-center">
                            If your friends or neighbors have cats then you might be ready to adopt your own. <b>If you live alone, or you have a partner but you don't like kids, then a cat may be right for you.</b></span>   
                        <span className="absolute top-60 block px-8 pb-3 font-biz text-lg text-center">
                            First of all -- <b>adopt, don't shop!</b> Not only is it expensive to buy purebred kittens, they just don't live as long as the common house cat. Oh, that & people breeding cats for profits <b>won't</b> benefit you either.
                            </span>   
                        <span className="absolute bottom-52 block px-8 pb-3 font-biz text-lg text-center">
                            <b>Nothing is better</b> than rescuing a cat (or two or four) from your local animal rescue organization. <b>Finding forever homes for our cats is an ongoing labor of love and care</b>.
                            </span>   

                        <span className="absolute bottom-10 block px-8 pb-6 font-biz text-lg rounded-b-xl text-center">
                            Rescued cats and kittens are cared for through a network of foster homes until they are adopted. <b>Adopt through us and you'll be saving a life and helping the community with it's cat overpopulation issue!</b></span>   

                    </div>

                    <footer className="text-purple-200 font-biz text-xs text-center pt-1- pr-10 absolute right-96 -bottom-80">ⓒ Purrfect Friends 2022</footer>
                
                </div>
    </section>
}
