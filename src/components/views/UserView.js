import { Route, Routes } from 'react-router-dom'
import { FosterList } from "../fosters/FosterList"
import { FosterDetails } from '../fosters/FosterDetails'
import { MessageForm } from '../forms/MessageForm'
import { ProfileDetails } from '../profiles/ProfileDetails'

export const UserView = () => {
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

			<Route path="fosters/:fosterId" element={ <FosterDetails /> } />

			<Route path="contact" element={ <MessageForm /> } />

			<Route path="profile" element={ <ProfileDetails /> } />
		
		</Routes>
	)
}