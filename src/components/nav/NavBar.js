import { UserNav } from "./UserNav"
import { FosterParentNav } from "./FosterParentNav"
import { SlHome } from "react-icons/sl";

export const NavBar = () => {

	const currentPurrfectUser = localStorage.getItem("purrfect_user")
    const purrfectUserObj = JSON.parse(currentPurrfectUser)

    if (purrfectUserObj.staff) {
        // returns fosterParent view
        return <FosterParentNav />
    } else {
        //returns user view
        return <UserNav />
    }
}