import { Route, Routes } from 'react-router-dom'
import { FilterFostersUsers } from '../fosters/FilterFostersUsers'
import { FosterDetails } from '../fosters/FosterDetails'
import { MessageForm } from '../forms/MessageForm'
import { ProfileDetails } from '../profiles/ProfileDetails'
import { WelcomeUser } from '../nav/WelcomeUser'

// Route enables the navigation among views of various components in React; allows changing the browser URL

export const UserView = () => {
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

			<Route path="fosters" element={ <FilterFostersUsers /> } />

			<Route path="fosters/:fosterId" element={ <FosterDetails /> } />

			<Route path="contact" element={ <MessageForm /> } />

			<Route path="profile" element={ <ProfileDetails /> } />
		
		</Routes>
	)
}