import React from 'react';
import './styles/HotelCard.css';
import StarGenerator from '../shared/StarGenerator';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
	const navigate = useNavigate();
	const navigateHotelDetails = () => {
		navigate(`/hotel/${hotel.id}`);
	};

	return (
		<article className="hotel">
			<header className="hotel__header">
				<img className="hotel__image" src={hotel.images[0].url} alt={hotel.name} />
			</header>
			<section className="hotel__body">
				<h3 className="hotel__name">{hotel.name}</h3>
				<div className="hotel__rating flex-container">
					<StarGenerator rating={hotel.rating} />
					<span className="hotel__rating-value">{hotel.rating}</span>
				</div>
				<div className="hotel__city">
					{hotel.city.name},{hotel.city.country}
				</div>
				<div className="hotel__price">$ {hotel.price}</div>
				<button onClick={navigateHotelDetails} className="hotel__btn">
					See more...
				</button>
			</section>
		</article>
	);
};

export default HotelCard;
