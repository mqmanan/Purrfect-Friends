import { Link, useNavigate } from "react-router-dom"
import { GiHouse } from "react-icons/gi"
import { GiArchiveRegister } from "react-icons/gi"
import { BsMailbox2 } from "react-icons/bs"
import { GiCat } from "react-icons/gi"
import { FaHandPeace } from "react-icons/fa"
import { FaUsers } from "react-icons/fa"

export const FosterParentNav = () => {
    const navigate = useNavigate()

    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-purple-300 shadow-lg">
        
            <Link className="navbar-link" to="/">
            <NavBarHome icon={<GiHouse size="30" />} />
            </Link>

            <Link className="navbar__link" to="/parents">
            <NavBarFosterParents icon={<FaUsers size="30" />} />
            </Link>
            
            <Link className="navbar-link" to="/fosters">
            <NavBarFosters icon={<GiCat size="30" to="/fosters" />} />    
            </Link>

            <Link className="navbar-link" to="/create">
            <NavBarCreate icon={<GiArchiveRegister size="30" />} />
            </Link>
        
            <Link className="navbar-link" to="/mailbox">
            <NavBarMailbox icon={<BsMailbox2 size="30" />} />
            </Link>

            {/* <Link className="navbar-link" to="/profile">
            <NavBarProfile icon={<TfiGithub size="30" />} />
            </Link> */}
           
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

const NavBarFosterParents = ({ icon, text = 'Meet the Parents' }) => (
    <div className="navbar-icon group">
        {icon}

    <span className="navbar-details group-hover:scale-100">
        {text}
    </span>

    </div>
)

const NavBarCreate = ({ icon, text = 'New Foster' }) => (
    <div className="navbar-icon group">
        {icon}

    <span className="navbar-details group-hover:scale-100">
        {text}
    </span>

    </div>
)

const NavBarMailbox = ({ icon, text = 'Mail' }) => (
    <div className="navbar-icon group">
        {icon}

    <span className="navbar-details group-hover:scale-100">
        {text}
    </span>

    </div>
)

// const NavBarProfile = ({ icon, text = 'Profile' }) => (
//     <div className="navbar-icon group">
//         {icon}

//     {/* <span className="navbar-details group-hover:scale-100">
//         {text}
//     </span> */}

//     </div>
// )

const NavBarLogOut = ({ icon, text = 'Peace' }) => (
    <div className="navbar-icon group">
        {icon}

    <span className="navbar-details group-hover:scale-100">
        {text}
    </span>

    </div>
)