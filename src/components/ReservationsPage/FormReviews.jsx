import { useForm } from "react-hook-form";
import "./styles/FormReviews.css";
import useCrud from "../../hooks/useCrud";

const FormReviews = ({
  formIsOpen,
  bookSelected,
  setFormIsOpen,
  setBookSelected,
}) => {
  const initialDate = new Date(bookSelected?.checkIn).getTime();
  const finalDate = new Date(bookSelected?.checkOut).getTime();
  const reservationDays = (finalDate - initialDate) / (1000 * 3600 * 24);
  const { reset, handleSubmit, register } = useForm();
  const [, , createReview] = useCrud();

  const submit = (data) => {
    const url = "https://booking-app-pad5.onrender.com/api/v1/reviews";
    const reviewData = { ...data, hotelId: bookSelected?.hotelId };

    createReview(url, reviewData, true);
    reset({
      rating: "5",
      comment: "",
    });
    setBookSelected();
    setFormIsOpen(false);
  };

  const handleExit = () => {
    reset({
      rating: "5",
      comment: "",
    });
    setBookSelected();
    setFormIsOpen(false);
  };

  return (
    <div
      className={`review__container flex-container ${
        formIsOpen || "review__closed"
      }`}
    >
      <section className="review">
        <i onClick={handleExit} className="bx bx-x review__close"></i>
        <h2 className="review__title">Rate the service</h2>
        <article className="review__reserve">
          {/* <header className="review__reserve-header">
						<img className="review__reserve-img" src={bookSelected?.hotel.images[0].url} alt={bookSelected?.hotel.name} />
					</header> */}
          <div className="review__reserve-body">
            <h3 className="review__reserve-title">
              {bookSelected?.hotel.name}
            </h3>
            <ul className="review__reserve-list">
              {/* <li className="review__reserve-item">
								{bookSelected?.hotel.city.name}
								{bookSelected?.hotel.city.country}
							</li> */}
              <li className="review__reserve-item">
                <span className="review__reserve-label">Reservation Days</span>
                <span>{reservationDays}</span>
              </li>
              <li className="review__reserve-item">
                <span className="review__reserve-label">Subtotal Price</span>
                <span>$ {reservationDays * +bookSelected?.hotel.price}</span>
              </li>
            </ul>
          </div>
        </article>
        <form
          onSubmit={handleSubmit(submit)}
          className="review__form grid-container"
        >
          <label className="review__form-field grid-container">
            <span className="review__form-label">Rating</span>
            <select {...register("rating")}>
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>
          </label>
          <label className="review__form-field grid-container">
            <span className="review__form-label">Comments</span>
            <textarea
              {...register("comment")}
              className="review__form-textarea"
            ></textarea>
          </label>
          <button className="review__form-btn">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default FormReviews;
