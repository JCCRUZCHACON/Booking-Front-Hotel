import { useEffect, useState } from "react";
import useCrud from "../hooks/useCrud";
import "./styles/ReservationsPage.css";
import BookCard from "../components/ReservationsPage/BookCard";
import FormReviews from "../components/ReservationsPage/FormReviews";
import { Link } from "react-router-dom";
import Loader from "../components/shared/Loader";

const ReservationsPage = () => {
  const [reservations, getReservations, , deleteReservation] = useCrud();
  const [bookSelected, setBookSelected] = useState();
  const [formIsOpen, setFormIsOpen] = useState(false);

  useEffect(() => {
    const url = "https://booking-app-pad5.onrender.com/api/v1/bookings";
    getReservations(url, true);
  }, []);

  return (
    <section className="reservations flex-container">
      <h2 className="reservations__title">Reservations</h2>
      {reservations ? (
        reservations?.length ? (
          <div>
            <FormReviews
              formIsOpen={formIsOpen}
              bookSelected={bookSelected}
              setFormIsOpen={setFormIsOpen}
              setBookSelected={setBookSelected}
            />

            <div className="reservations__container flex-container">
              {reservations?.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  deleteReservation={deleteReservation}
                  setBookSelected={setBookSelected}
                  setFormIsOpen={setFormIsOpen}
                />
              ))}
            </div>
          </div>
        ) : (
          <h2>
            There are no reservations, please choose a hotel and make one in
            <p className="link">
              <Link to="/">Home</Link>
            </p>
          </h2>
        )
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default ReservationsPage;
