import { UserNav } from "./UserNav"
import { FosterParentNav } from "./FosterParentNav"
import "./NavBar.css"

export const NavBar = () => {
	
	const currentPurrfectUser = localStorage.getItem("purrfect_user")
    const purrfectUserObj = JSON.parse(currentPurrfectUser)

    if (purrfectUserObj.staff) {
        // return fosterParent view
        return <FosterParentNav />
    } else {
        //return user view
        return <UserNav />
    }
}

