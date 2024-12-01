import { useState } from 'react';
import './styles/SliderImgHotels.css';

const SliderImgHotels = ({ hotel }) => {
	const [imgSelected, setImgSelected] = useState(0);

	const handlePrev = () => {
		if (imgSelected - 1 >= 0) {
			setImgSelected(imgSelected - 1);
		}
	};

	const handleNext = () => {
		const lengthImgs = hotel?.images.length - 1;
		setImgSelected((state) => (state + 1 <= lengthImgs ? state + 1 : state));
	};

	const objStyle = {
		width: `${hotel?.images.length * 100}%`,
		transform: `translateX(calc((-${imgSelected} / ${hotel?.images.length}) * 100%))`,
	};

	return (
		<div className="slider flex-container">
			<i onClick={handlePrev} className="bx bxs-chevron-left slider__btn slider__btn-preview flex-container"></i>
			<div className="slider__body">
				<div className="slider__container flex-container" style={objStyle}>
					{hotel?.images.map((image) => (
						<div className="slider__img-container" key={image.id}>
							<img className="slider__img" src={image.url} alt={hotel?.name} />
						</div>
					))}
				</div>
			</div>
			<i onClick={handleNext} className="bx bxs-chevron-right slider__btn slider__btn-next flex-container"></i>
		</div>
	);
};

export default SliderImgHotels;
