const StarGenerator = ({ rating }) => {
	const fullStars = Math.floor(rating);
	const halfStar = !!(rating % 1);
	const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
	return (
		<div>
			{[...Array(fullStars)].map((_, i) => (
				<i key={i} className="bx bxs-star"></i>
			))}
			{halfStar && <i className="bx bxs-star-half"></i>}
			{[...Array(emptyStars)].map((_, i) => (
				<i key={i} className="bx bx-star"></i>
			))}
		</div>
	);
};
export default StarGenerator;
