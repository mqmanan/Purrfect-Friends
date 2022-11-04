import { Link } from "react-router-dom"

export const Foster = ({ id, foster }) => {


    return (
    
    <section className="px-10 pb-10 hover:animate-bounce">
    
        <div className="rounded-2xl shadow-md hover:shadow-lg hover:shadow-slate-600">
        
            <div className="hover:shadow-slate-600">
                <Link to={`/fosters/${id}`} >
                    <img className="rounded-t-xl" 
                         src={foster.imageUrl}
                         width="230px" 
                    />
                </Link>
            </div>

            <div className="text-purple-700 mb-10 font-bold text-center font-amatic text-3xl tracking-wider">
                <Link to={`/fosters/${id}`} >
                    {foster.name}
                </Link>
            </div>
        
        </div>

    </section>

    )
}