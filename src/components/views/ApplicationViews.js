import { FosterParentView } from "./FosterParentView"
import { UserView } from "./UserView"

export const ApplicationViews = () => {
	
	const currentPurrfectUser = localStorage.getItem("purrfect_user")
    const purrfectUserObj = JSON.parse(currentPurrfectUser)

    if (purrfectUserObj.staff) {
        // return fosterParent view
        return <FosterParentView />
    } else {
        //return user view
        return <UserView />
    }
}

