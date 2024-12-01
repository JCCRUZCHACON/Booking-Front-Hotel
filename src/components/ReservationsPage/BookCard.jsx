import Swal from 'sweetalert2';
import './styles/BookCard.css';

const BookCard = ({ book, deleteReservation, setBookSelected, setFormIsOpen }) => {
	const initialDate = new Date(book.checkIn).getTime();
	const finalDate = new Date(book.checkOut).getTime();
	const reservationDays = (finalDate - initialDate) / (1000 * 3600 * 24);
	const handleDelete = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#ea4959',
			cancelButtonColor: '#000',
			confirmButtonText: 'Yes, delete it!',
			background: 'var(--primary-color)',
			color: 'var(--text-color)',
		}).then((result) => {
			if (result.isConfirmed) {
				const url = `http://localhost:8080/api/v1/bookings/${book.id}`;
				deleteReservation(url, book.id, true);
				
				Swal.fire({
					title: 'Deleted!',
					text: 'Your reservation has been deleted.',
					icon: 'success',
					confirmButtonColor: '#ea4959',
					background: 'var(--primary-color)',
					color: 'var(--text-color)',
				});
			}
		});
	};

	const handleReview = () => {
		setFormIsOpen(true);
		setBookSelected(book);
	};

	return (
		<article className="reservation flex-container">
			{/* <header className="reservation__header">
				<img className="reservation__img" src={book.hotel.images[0].url} alt={book.hotel.name} />
			</header> */}
			<section className="reservation__body">
				<h3 className="reservation__name">{book.hotel.name}</h3>
				{/* <div className="reservation__city">
					{book.hotel.city.name}, {book.hotel.city.country}
				</div> */}
				<span className="reservation__review-container">
					Rate and comment the service ...
					<p onClick={handleReview} className="reservation__review">
						Click here!
					</p>
				</span>
				<ul className="reservation__list">
					<li className="reservation__list-item flex-container">
						<span className="reservation__list-label">Reservations Days</span>
						<span className="reservation__list-value">{reservationDays}</span>
					</li>
					<li className="reservation__list-item flex-container">
						<span className="reservation__list-label">Subtotal Price</span>
						<span className="reservation__list-value">USD ${reservationDays * +book.hotel.price}</span>
					</li>
				</ul>
				<button className="reservation__btn" onClick={handleDelete}>
					<i className="bx bx-trash"></i>
				</button>
			</section>
		</article>
	);
};

export default BookCard;
