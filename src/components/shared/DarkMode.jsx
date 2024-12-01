import './styles/DarkMode.css';

const DarkMode = () => {
	return (
		<div className="toggle__darkmode">
			<input type="checkbox" name="color-scheme" id="darkmode-toggle" className="toggle__darkmode-input" />
			<label htmlFor="darkmode-toggle" className="toggle__darkmode-label">
				<i className="bx bx-moon toggle__darkmode-moon"></i>
				<i className="bx bx-sun toggle__darkmode-sun"></i>
			</label>
		</div>
	);
};

export default DarkMode;
