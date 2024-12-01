import { Navigate, Outlet } from 'react-router-dom';
//Rutas Protegidas
const ProtectedRoutes = () => {
	if (localStorage.getItem('token')) {
		return <Outlet />;
	} else {
		return <Navigate to="/login" />;
	}
};

export default ProtectedRoutes;
