import { Route, Routes } from 'react-router-dom'
import { FosterList } from "../fosters/FosterList"

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
			<Route path="fosterparents" element={ <></> } />
			<Route path="join" element={ <></> } />
			<Route path="profile" element={ <></> } />
		
		</Routes>
	)
}