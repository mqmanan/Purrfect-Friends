import { Route, Routes } from 'react-router-dom'
import { FosterList } from "../fosters/FosterList"
import { NewFosterForm } from "../forms/NewFosterForm"
import { FosterDetailsParent } from '../fosters/FosterDetailsParent'
import { EditFosterForm } from '../forms/EditFosterForm'
import { MessageList } from '../forms/MessgeList'
import { ProfileDetails } from '../profiles/ProfileDetails'
import { MessageDetails } from '../forms/MessageDetails'
import { WelcomeUser } from '../nav/WelcomeUser'

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

			<Route path="fosters" element={ <FosterList /> } />

			<Route path="fosters/:fosterId" element={ <FosterDetailsParent /> } />

			<Route path="fosters/:fosterId/edit" element={ <EditFosterForm /> } />

			<Route path="create" element={ <NewFosterForm /> } />

			<Route path="mailbox" element={ <MessageList /> } />

			<Route path="mailbox/:messageId" element={ <MessageDetails /> } />

			<Route path="profile" element={ <ProfileDetails /> } />

		</Routes>
	)
}