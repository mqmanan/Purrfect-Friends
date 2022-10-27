import { Route, Routes } from 'react-router-dom'
import { FosterList } from "../fosters/FosterList"
import { NewFosterForm } from "../forms/NewFosterForm"
import { FosterDetailsParent } from '../fosters/FosterDetailsParent'
import { EditFosterForm } from '../forms/EditFosterForm'
import { Mailbox } from '../forms/Mailbox'
import { ProfileDetails } from '../profiles/ProfileDetails'

export const FosterParentView = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
				 	<center>
					<div> Purrfect Friends </div>
					</center>
				</>
			}>
			</Route>

			<Route path="fosters" element={ <FosterList /> } />

			<Route path="fosters/:fosterId" element={ <FosterDetailsParent /> } />

			<Route path="fosters/:fosterId/edit" element={ <EditFosterForm /> } />

			<Route path="create" element={ <NewFosterForm /> } />

			<Route path="mailbox" element={ <Mailbox /> } />

			<Route path="profile" element={ <ProfileDetails /> } />

		</Routes>
	)
}