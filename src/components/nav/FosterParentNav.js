import { Link, useNavigate } from "react-router-dom"

export const FosterParentNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
             <li className="navbar-item">
                <Link className="navbar-link" to="/">Home</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/fosters">Meet The Fosters</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/create">New Foster Form</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/mailbox">Mailbox</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/profile">Profile</Link>
            </li>
            
            {
                localStorage.getItem("purrfect_user")
                    ? <li className="navbar-item navbar-logout">
                        <Link className="navbar-link" to="" onClick={() => {
                            localStorage.removeItem("purrfect_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}