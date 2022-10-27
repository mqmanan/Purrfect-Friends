import { Link } from "react-router-dom"

export const Foster = ({ id, name, imgsrc }) => {
    return <section className="foster">
    <center><br></br>
    <div>
        <Link to={`/fosters/${id}`}><b>Name</b>: {name} </Link>
    </div>

    <img src={imgsrc} alt={name} /><br></br>
    </center>
</section>
}