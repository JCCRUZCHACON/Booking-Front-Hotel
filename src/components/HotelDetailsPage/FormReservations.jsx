import { useForm } from "react-hook-form";
import useCrud from "../../hooks/useCrud";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/FormReservations.css";
import Swal from "sweetalert2";

const FormReservations = ({ hotelId }) => {
  const { reset, handleSubmit, register } = useForm();
  const [, , createBooking] = useCrud();

  const navigate = useNavigate();

  const submit = (data) => {
    const url = `${import.meta.env.VITE_API_URL}/bookings`;
    const objData = { ...data, hotelId };
    createBooking(url, objData, true);
    reset({
      checkIn: "",
      checkOut: "",
    });
    navigate("/reservations");
    Swal.fire({
      title: "Reserved Successfully",
      text: "",
      icon: "success",
      confirmButtonColor: "#fa4040",
      background: "var(--primary-color)",
      color: "var(--text-color)",
    });
  };

  return (
    <form className="reserv " onSubmit={handleSubmit(submit)}>
      <h3 className="reserv__title">Make your reservation</h3>
      <div className="reserv__container flex-container">
        <label className="reserv__checkin flex-container">
          <span className="reserv__checkin-label">Check-in</span>
          <input
            className="reserv__checkin-input"
            {...register("checkIn")}
            type="date"
          />
        </label>
        <label className="reserv__checkout flex-container">
          <span className="reserv__checkout-label">Check-out</span>
          <input
            className="reserv__checkout-input"
            {...register("checkOut")}
            type="date"
          />
        </label>
        <button className="reserv__btn">Reserve</button>
      </div>
    </form>
  );
};

export default FormReservations;
