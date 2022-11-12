import { Link } from "react-router-dom"

export const Foster = ({ id, foster }) => {

    return (
    
    <section className="">
    
        <div className="rounded-2xl shadow-md hover:shadow-lg hover:shadow-slate-600 hover:animate-tilt">

        <div className="grid gap-8 items-start justify-center mb-7">
            <div className="relative group">
                <button className="absolute -inset-1 bg-gradient-to-r from-purple-900 to-indigo-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-tilt"></button>
 

            <div className="relative">
                <Link to={`/fosters/${id}`} >
                    <img className="rounded-t-xl" 
                         src={foster.imageUrl}
                         alt="foster"
                         width="210px" 
                    />
                </Link>
            </div>

            <div className="relative bg-white text-purple-700 font-extrabold text-center font-amatic text-3xl tracking-widest rounded-b-xl">
                <Link to={`/fosters/${id}`} >
                    {foster.name}
                </Link>
            </div>

        </div>
        </div>
        
        </div>

    </section>
    )
}