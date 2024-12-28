import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { getHotelsThunk } from "../../store/slices/products.slice";
import "./styles/FilterByCity.css";

const FilterByCity = ({
  setNameFiltered,
  setPriceFiltered,
  handleFilterClose,
}) => {
  const [cities, getCities] = useFetch();
  const dispatch = useDispatch();
  useEffect(() => {
    const url = "https://booking-app-lmn3.onrender.com/api/v1/cities";
    getCities(url);
  }, []);

  const handleCities = (cityId) => {
    const url = `https://booking-app-lmn3.onrender.com/api/v1/hotels${
      cityId ? `?cityId=${cityId}` : ""
    }`;

    dispatch(getHotelsThunk(url));
    setNameFiltered("");
    setPriceFiltered({
      from: 0,
      to: Infinity,
    });

    handleFilterClose();
  };

  return (
    <article className="filtercity grid-container">
      <h4 className="filtercity__title">Cities</h4>
      <ul className="filtercity__list grid-container">
        <li className="filtercity__list-item" onClick={() => handleCities()}>
          All cities
        </li>
        {cities?.map((city) => (
          <li
            className="filtercity__list-item"
            onClick={() => handleCities(city.id)}
            key={city.id}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default FilterByCity;
