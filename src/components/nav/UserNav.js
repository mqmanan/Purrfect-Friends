import { Link, useNavigate } from "react-router-dom"
import { MdOutlineCatchingPokemon } from "react-icons/md"
import { TfiGithub } from "react-icons/tfi"
import { BiMailSend } from "react-icons/bi"
import { GiCat } from "react-icons/gi"
import { FaHandPeace } from "react-icons/fa"

export const UserNav = () => {
    const navigate = useNavigate()

    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-purple-300 shadow-lg">
        
            <Link className="navbar-link" to="/">
            <NavBarHome icon={<MdOutlineCatchingPokemon size="30" />} />
            </Link>
            
            <Link className="navbar-link" to="/fosters">
            <NavBarFosters icon={<GiCat size="30" to="/fosters" />} />    
            </Link>

            <Link className="navbar__link" to="/contact">
            <NavBarContact icon={<BiMailSend size="30" />} />
            </Link>
           
            <Link className="navbar-link" to="/profile">
            <NavBarProfile icon={<TfiGithub size="30" />} />
            </Link>
           
            {
                localStorage.getItem("purrfect_user")
                    ? <Link className="navbar-link" to="" onClick={() => {
                            localStorage.removeItem("purrfect_user")
                            navigate("/", {replace: true})
                        }}><NavBarLogOut icon={<FaHandPeace size="30" />} /></Link>
                    : ""
            }
        </div>
    )
}

const NavBarHome = ({ icon, text = 'Home' }) => (
    <div className="navbar-icon group">
        {icon}

    <span className="navbar-details group-hover:scale-100">
        {text}
    </span>

    </div>
)

const NavBarFosters = ({ icon, text = 'Meet the Fosters' }) => (
    <div className="navbar-icon group">
        {icon}

    <span className="navbar-details group-hover:scale-100">
        {text}
    </span>

    </div>
)

const NavBarContact = ({ icon, text = 'Contact Us' }) => (
    <div className="navbar-icon group">
        {icon}

    <span className="navbar-details group-hover:scale-100">
        {text}
    </span>

    </div>
)

const NavBarProfile = ({ icon, text = 'Profile' }) => (
    <div className="navbar-icon group">
        {icon}

    <span className="navbar-details group-hover:scale-100">
        {text}
    </span>

    </div>
)

const NavBarLogOut = ({ icon, text = 'Peace Out' }) => (
    <div className="navbar-icon group">
        {icon}

    <span className="navbar-details group-hover:scale-100">
        {text}
    </span>

    </div>
)