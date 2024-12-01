import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelsThunk } from '../store/slices/products.slice';
import HotelCard from '../components/HomePage/HotelCard';
import './styles/HomePage.css';
import FilterByName from '../components/HomePage/FilterByName';
import FilterByCity from '../components/HomePage/FilterByCity';
import FilterByPrice from '../components/HomePage/FilterByPrice';
import Loader from '../components/shared/Loader';

const HomePage = () => {
	const [nameFiltered, setNameFiltered] = useState('');
	const [priceFiltered, setPriceFiltered] = useState({ from: 0, to: Infinity });
	const [filtersAreOpen, setFiltersAreOpen] = useState(false);
	const products = useSelector((states) => states.products);
	const dispatch = useDispatch();
	useEffect(() => {
		const url = 'http://localhost:8080/api/v1/hotels';
		dispatch(getHotelsThunk(url));
	}, []);

	const callbackFilter = (hotel) => {
		const filterName = hotel.name.toLowerCase().includes(nameFiltered);

		const price = +hotel.price;
		const filterByPrice =
			price >= priceFiltered.from && price <= priceFiltered.to;

		return filterName && filterByPrice;
	};

	const handleFilterClose = () => {
		setFiltersAreOpen(false);
	};
	const handleFilterOpen = () => {
		setFiltersAreOpen(true);
	};

	return (
		<div className="home">
			<section
				className={`home__filters grid-container ${
					filtersAreOpen || 'home__filters-closed'
				}`}
			>
				<i
					onClick={handleFilterClose}
					className="bx bx-x-circle home__filters-btnclose"
				></i>
				<h3 className="home__filters-title">Filters</h3>
				<FilterByPrice
					setPriceFiltered={setPriceFiltered}
					handleFilterClose={handleFilterClose}
					setNameFiltered={setNameFiltered}
				/>
				<FilterByCity
					setNameFiltered={setNameFiltered}
					setPriceFiltered={setPriceFiltered}
					handleFilterClose={handleFilterClose}
				/>
			</section>
			<section className="home__hotels grid-container">
				<div className="home__hotels-filters flex-container">
					<FilterByName
						setNameFiltered={setNameFiltered}
						setPriceFiltered={setPriceFiltered}
					/>
					<i
						onClick={handleFilterOpen}
						className="bx bx-filter-alt home__hotels-btnfilters"
					></i>
				</div>

				{products && !products.some(callbackFilter) ? (
					<span className="error__container">
						<h2 className="error__message">
							There are no matching hotels. Please try again!{' '}
						</h2>
					</span>
				) : products ? (
					<div className="hotels__container flex-container">
						{products?.filter(callbackFilter).map((hotel) => (
							<HotelCard key={hotel.id} hotel={hotel} />
						))}
					</div>
				) : (
					<Loader />
				)}
			</section>
		</div>
	);
};

export default HomePage;
