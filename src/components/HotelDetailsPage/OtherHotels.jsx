import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import HotelCard from "../HomePage/HotelCard";
import "./styles/OtherHotels.css";

const OtherHotels = ({ city, id }) => {
  const [hotelsByCity, getHotelsByCity] = useFetch();
  useEffect(() => {
    if (city) {
      const url = `${import.meta.env.VITE_API_URL}/hotels?cityId=${city?.id}`;
      getHotelsByCity(url);
    } else {
    }
  }, [city]);

  return (
    <section>
      <h3 className="others__title">
        Other hotels in <span>{city?.country}</span>
      </h3>
      <div className="others__container flex-container">
        {hotelsByCity
          ?.filter((hotel) => hotel.id !== id)
          .map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
      </div>
    </section>
  );
};

export default OtherHotels;
