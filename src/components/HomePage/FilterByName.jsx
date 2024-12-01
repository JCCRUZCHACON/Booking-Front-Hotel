import { useRef } from 'react';
import './styles/FilterByName.css';

const FilterByName = ({ setNameFiltered, setPriceFiltered }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		setNameFiltered(inputSearch.current.value.trim().toLowerCase());
		setPriceFiltered({ from: 0, to: Infinity });
		e.target.reset();
	};

	const inputSearch = useRef();

	return (
		<div className="filtername flex-container">
			<form onSubmit={handleSubmit}>
				<input
					className="filtername__form-input"
					ref={inputSearch}
					type="text"
				/>
				<button className="filtername__form-btn">Search</button>
			</form>
		</div>
	);
};

export default FilterByName;
