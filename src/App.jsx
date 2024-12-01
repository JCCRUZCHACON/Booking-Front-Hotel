import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Header from './components/shared/Header';
import ReservationsPage from './pages/ReservationsPage';
import ProtectedRoutes from './pages/ProtectedRoutes';

function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/hotel/:id" element={<HotelDetailsPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route element={<ProtectedRoutes />}>
					<Route path="/reservations" element={<ReservationsPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
