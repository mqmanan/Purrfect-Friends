import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const FosterParentNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
             <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/fosters">Meet The Fosters</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/fosterparents">Meet The Parents</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/create">New Foster Form</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            
            {
                localStorage.getItem("purrfect_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("purrfect_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}