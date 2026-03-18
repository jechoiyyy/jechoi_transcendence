import { Route, Routes, Navigate } from 'react-router-dom';

import useUserInfo from "@hooks/user/useUserInfo";

import RoomRoute from '@routes/RoomRoute'

import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import HomePage from '@pages/HomePage';
import RoomPage from '@pages/RoomPage';

const BaseRoutes = () => {
	const { user } = useUserInfo({ enabled:false });

	return (
		<Routes>
			<Route 
				path="/" 
				element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
			/>
			<Route
				path="/home" 
				element={user ? <HomePage /> : <Navigate to="/login" replace />}
			/>
			<Route 
				path="/login"
				element={user ? <Navigate to="/home" replace /> : <LoginPage />}
			/>
			<Route 
				path="/signup"
				element={user ? <Navigate to="/home" replace /> : <SignupPage />}
			/>
			<Route
				path="/games"
				element={
					<RoomRoute>
						<RoomPage />
					</RoomRoute>
				}
			/>
		</Routes>
	)
};

export default BaseRoutes;