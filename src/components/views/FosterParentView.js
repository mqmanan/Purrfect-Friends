import { Route, Routes } from 'react-router-dom'
import { NewFosterForm } from "../forms/NewFosterForm"
import { FosterDetailsParent } from '../fosters/FosterDetailsParent'
import { EditFosterForm } from '../forms/EditFosterForm'
import { MessageList } from '../forms/MessgeList'
import { ParentProfile } from '../profiles/ParentProfile'
import { MessageDetails } from '../forms/MessageDetails'
import { WelcomeUser } from '../nav/WelcomeUser'
import { FilterFostersParents } from '../fosters/FilterFostersParents'
import { ParentList } from '../ParentFoster/ParentList'
import { EditProfile } from '../profiles/EditProfile'

export const FosterParentView = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
				 	<center>
					 <WelcomeUser /> 
					</center>
				</>
			}>
			</Route>

			<Route path="fosters" element={ <FilterFostersParents /> } />
			
			<Route path="parents" element={ <ParentList/> } />

			<Route path="fosters/:fosterId" element={ <FosterDetailsParent /> } />

			<Route path="fosters/:fosterId/edit" element={ <EditFosterForm /> } />

			<Route path="create" element={ <NewFosterForm /> } />

			<Route path="mailbox" element={ <MessageList /> } />

			<Route path="mailbox/:messageId" element={ <MessageDetails /> } />

			<Route path="profile" element={ <ParentProfile /> } />

			<Route path="profile/:fosterParentId" element={ <EditProfile /> } />

		</Routes>
	)
}