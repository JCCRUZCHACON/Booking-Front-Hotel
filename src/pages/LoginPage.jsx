import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './styles/LoginPage.css';
import Swal from 'sweetalert2';
import Loader from '../components/shared/Loader';

const LoginPage = () => {
	const [userLogged, setUserLogged] = useState();
	const [showLoader, setShowLoader] = useState(true);
	const { handleSubmit, reset, register } = useForm();
	const { loginUser } = useAuth();
	const navigate = useNavigate();

	const submit = (data) => {
		loginUser(data);
		reset({
			email: '',
			password: '',
		});
		navigate('/');
		Swal.fire({
			title: 'Logged Successfully',
			text: '',
			icon: 'success',
			confirmButtonColor: '#fa4040',
			background: 'var(--primary-color)',
			color: 'var(--text-color)',
		});
	};

	useEffect(() => {
		const userFromLocalStorage = localStorage.getItem('userLogged');
		if (userFromLocalStorage) {
			const parsedUser = JSON.parse(userFromLocalStorage);
			setUserLogged(parsedUser);
		}

		const timeout = setTimeout(() => {
			setShowLoader(false);
		}, 3000);

		return () => clearTimeout(timeout);
	}, []);

	const handleDeleteLocalStorage = () => {
		Swal.fire({
			title: 'Are you sure you want to logout?',
			text: '',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#ea4959',
			cancelButtonColor: 'black',
			confirmButtonText: 'Yes, logout!',
			background: 'var(--primary-color)',
			color: 'var(--text-color)',
		}).then((result) => {
			if (result.isConfirmed) {
				localStorage.removeItem('token');
				localStorage.removeItem('userLogged');
				navigate('/');
				Swal.fire({
					title: 'Logout!',
					text: 'See you later :D',
					icon: 'success',
					confirmButtonColor: '#ea4959',
					background: 'var(--primary-color)',
					color: 'var(--text-color)',
				});
			}
		});
	};

	return (
		<section className="login flex-container">
			{showLoader ? (
				<Loader />
			) : userLogged ? (
				<div className="user__logo-container">
					{userLogged.gender === 'other' ? (
						<img className="users__logo" src="/other-user.png" alt="other" />
					) : userLogged.gender === 'female' ? (
						<img className="users__logo" src="/female.png" alt="male" />
					) : (
						<img className="users__logo" src="/male.png" alt="male" />
					)}
					<h2 className="user__welcome">
						{'welcome, '}{' '}
						<span className="user__name">
							{userLogged.firstName} {userLogged.lastName}
						</span>
					</h2>
					<button className="user__btn" onClick={handleDeleteLocalStorage}>
						Logout
					</button>
				</div>
			) : (
				<div className="grid-container">
					<i className="bx bxs-user-circle user__logo"></i>
					<form
						className="user__form flex-container"
						onSubmit={handleSubmit(submit)}
					>
						<h2 className="user__name">Login User</h2>

						<label className="user__form-field grid-container">
							<span className="user__form-label">Email</span>
							<input
								className="user__form-input"
								type="email"
								{...register('email')}
							/>
						</label>
						<label className="user__form-field grid-container">
							<span className="user__form-label">Password</span>
							<input
								className="user__form-input"
								type="password"
								{...register('password')}
							/>
						</label>

						<button className="user__btn user__btn-login ">Submit</button>
					</form>
				</div>
			)}
		</section>
	);
};

export default LoginPage;
