import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import StarGenerator from "../components/shared/StarGenerator";
import OtherHotels from "../components/HotelDetailsPage/OtherHotels";
import HotelMap from "../components/HotelDetailsPage/HotelMap";
import FormReservations from "../components/HotelDetailsPage/FormReservations";
import Reviews from "../components/HotelDetailsPage/Reviews";
import SliderImgHotels from "../components/HotelDetailsPage/SliderImgHotels";
import "./styles/HotelDetailsPage.css";
import Loader from "../components/shared/Loader";

const HotelDetailsPage = () => {
  const { id } = useParams();

  const [hotel, getHotel, loading] = useFetch();

  useEffect(() => {
    const url = `https://booking-app-lmn3.onrender.com/api/v1/hotels/${id}`;
    getHotel(url);
  }, [id]);

  return (
    <section className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="details__title-container">
            <h2 className="details__title">{hotel?.name}</h2>
            <div className="details__stars">
              {hotel?.rating && <StarGenerator rating={hotel?.rating} />}
            </div>
            <span className="details__rating">{hotel?.rating}</span>
          </div>
          <div className="details__location-container flex-container">
            <div className="details__slider">
              {/* Slider: control deslizante */}
              <SliderImgHotels hotel={hotel} />
            </div>
            <div className="details__map">
              {hotel && <HotelMap lat={hotel.lat} lon={hotel.lon} />}
            </div>
          </div>
          <div className="details__city">
            {hotel?.city.name}, {hotel?.city.country}
          </div>
          <div className="details__address flex-container">
            <i className="bx bxs-map location__logo"></i>
            <address>{hotel?.address}</address>
          </div>
          <p className="details__description">{hotel?.description}</p>
          <section className="details__reservations">
            {localStorage.getItem("token") ? (
              <FormReservations hotelId={hotel?.id} />
            ) : (
              <p>
                If you want to make a reservation, please{" "}
                <div className="login__user">
                  <Link to={"/login"}>login here</Link>
                </div>
              </p>
            )}
          </section>
          <div className="details__reviews">
            <Reviews hotelId={hotel?.id} userId={id} />
          </div>
          <div className="details__other">
            <OtherHotels city={hotel?.city} id={hotel?.id} />
          </div>
        </>
      )}
    </section>
  );
};

export default HotelDetailsPage;
