import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import DarkMode from './DarkMode';

const Header = () => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	const handleMenu = () => {
		setIsOpenMenu(!isOpenMenu);
	};

	const closeMenu = () => {
		setIsOpenMenu(false);
	};

	return (
		<header className="header">
			<DarkMode />
			<h1 onClick={closeMenu} className="header__logo">
				<Link to="/">
					HOTELS
				</Link>
			</h1>
			<div onClick={handleMenu} className="header__menu">
				<i className="bx bx-menu"></i>
			</div>
			
			<nav className={`header__nav ${isOpenMenu || 'nav__close'}`}>
				<ul className="header__list">
					<li onClick={closeMenu} className="header__item">
						<Link to='reservations'>Reservations</Link>
					</li>
					<li onClick={closeMenu} className="header__item">
						<Link to="/register">Register</Link>
					</li>
					<li onClick={closeMenu} className="header__item">
						<Link to="/login">Login</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
